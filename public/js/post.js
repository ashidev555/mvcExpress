const submitCommentHandler = async (event) => {
    event.preventDefault();
    const comment = document.querySelector(".comment-input").value.trim();
    const author_id = document.querySelector(".logged-in-user-id").innerHTML; //need id of logged in user
    const post_id = document.querySelector(".current-post-id").innerHTML;

    console.log(comment);
    console.log(author_id);
    console.log(post_id);

    if (!author_id) {
        document.location.replace("/login");
    } else {
        if (comment) {
            const response = await fetch("/api/comment/", {
                method: "POST",
                body: JSON.stringify({ comment, author_id, post_id }),
                headers: { "Content-Type": "application/json" },
            });
            if (response.ok) {
                document.location.replace(
                    "/post/" + post_id + "#comment-section"
                );
                document.location.reload();
            } else {
                alert(
                    "Failed to submit comment. " +
                        response.status +
                        ": " +
                        response.statusText
                );
            }
        } else {
            alert("Please fill out all fields.");
        }
    }
};

document
    .querySelector(".comment-submit")
    .addEventListener("click", submitCommentHandler);
