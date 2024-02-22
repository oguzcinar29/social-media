import { db } from "../Database.js";

let likeId = 1;

export const makePost = async (req, res) => {
  const { postText } = req.body;
  const url = req.file ? req.file.path : null;
  const id = parseInt(req.body.id);

  try {
    await db.query(
      "INSERT INTO posts (post_text,img,user_id,share_time) VALUES ($1,$2,$3,$4)",
      [postText, url, id, req.body.date]
    );
    res.redirect("https://social-media-eta-amber.vercel.app");
  } catch (err) {
    console.log(err);
    res.json("invalid value sorry");
  }
};

export const getAllPost = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM posts ORDER BY id ASC");
    const data = result.rows;
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};

export const deletePost = async (req, res) => {
  const { postId } = req.body;
  try {
    await db.query("DELETE FROM posts WHERE id=($1)", [postId]);
  } catch (err) {
    console.log(err);
  }
};

export const addComment = async (req, res) => {
  const { userId, postId, comment, date } = req.body;

  const object = {
    userId: userId,
    comment: comment,
    date: date,
  };

  try {
    // Pass JSON string directly without wrapping it in an array
    await db.query("UPDATE posts SET data2=data2 || ($1)::jsonb  WHERE id=$2", [
      object, // JSON string
      postId,
    ]);

    res.redirect("https://social-media-eta-amber.vercel.app");
  } catch (err) {
    console.log(err);
    // Handle the error appropriately
    res.status(500).send("Internal Server Error");
  }
};

export const getLike = async (req, res) => {
  const { userId, postId, count } = req.body;

  try {
    // Fetch the current likes array for the post
    const result = await db.query("SELECT likes FROM posts WHERE id = $1", [
      postId,
    ]);
    const likesArray = result.rows[0].likes;

    // Check if the likes array is empty or null
    if (!likesArray || likesArray.length === 0) {
      // If empty or null, create a new like object and add it to the array
      const newLike = {
        likeId: 1, // You may need to adjust this based on your application logic
        userId: userId,
        postId: postId,
        boolean: true,
      };

      // Update the posts table with the new likes array
      await db.query("UPDATE posts SET likes = $1 WHERE id = $2", [
        [newLike],
        postId,
      ]);

      // Update the like count for the post
      await db.query("UPDATE posts SET like_count = $1 WHERE id = $2", [
        count + 1,
        postId,
      ]);
    } else {
      // Find the specific like object for the user
      const foundIndex = likesArray.findIndex((like) => like.userId === userId);

      if (foundIndex !== -1) {
        // If the like object is found, toggle the boolean value
        likesArray[foundIndex].boolean = !likesArray[foundIndex].boolean;
        console.log(likesArray);
        // Update the posts table with the modified likes array
        await db.query("UPDATE posts SET likes = $1 WHERE id = $2", [
          likesArray,
          postId,
        ]);

        // Update the like count for the post if needed
        if (likesArray[foundIndex].boolean) {
          await db.query("UPDATE posts SET like_count = $1 WHERE id = $2", [
            count + 1,
            postId,
          ]);
        } else {
          await db.query("UPDATE posts SET like_count = $1 WHERE id = $2", [
            count - 1,
            postId,
          ]);
        }
      } else {
        // If the like object is not found, add a new like object to the array
        const newLike = {
          likeId: 1, // You may need to adjust this based on your application logic
          userId: userId,
          postId: postId,
          boolean: true,
        };
        likesArray.push(newLike);

        // Update the posts table with the modified likes array
        await db.query("UPDATE posts SET likes = $1 WHERE id = $2", [
          likesArray,
          postId,
        ]);

        // Update the like count for the post
        await db.query("UPDATE posts SET like_count = $1 WHERE id = $2", [
          count + 1,
          postId,
        ]);
      }
    }

    // Send a response indicating success
    res.status(200).json({ success: true });
  } catch (error) {
    // Handle errors
    console.error("Error updating like:", error);
    res.status(500).json({ success: false, error: "Error updating like" });
  }
};

export const deleteComment = async (req, res) => {
  const { userId, comment, postId } = req.body;
  try {
    const result = await db.query("SELECT data2 FROM posts WHERE id=($1)", [
      postId,
    ]);
    const commentArr = result.rows;
    const findCommentIndex = commentArr[0].data2.findIndex(
      (item) => item.comment === comment
    );

    if (findCommentIndex !== -1) {
      commentArr[0].data2.splice(findCommentIndex, 1);
      try {
        await db.query("UPDATE posts SET data2=($1) WHERE id=($2)", [
          commentArr[0].data2,
          postId,
        ]);
      } catch (err) {
        console.log(err);
      }
    }
  } catch (err) {
    console.log(err);
  }
};

export const editCommentText = async (req, res) => {
  const { userId, postId, oldComment, newComment } = req.body;
  console.log(req.body);

  try {
    const result = await db.query("SELECT data2 FROM posts WHERE id=($1)", [
      postId,
    ]);
    const commentArr = result.rows;
    console.log(commentArr);
    const findComment = commentArr[0].data2.findIndex(
      (item) => item.comment === oldComment
    );
    console.log(findComment);

    commentArr[0].data2[findComment].comment = newComment;
    console.log(commentArr[0].data2);
    try {
      await db.query("UPDATE posts SET data2=($1) WHERE id=($2) ", [
        commentArr[0].data2,
        postId,
      ]);
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
};
