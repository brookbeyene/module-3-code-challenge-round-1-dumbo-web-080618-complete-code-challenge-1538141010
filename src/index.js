document.addEventListener('DOMContentLoaded', function() {

  const yourUUID = '044128b2-6e27-4cc9-adab-22d361f2f9ea';

  const imageURL = `https://randopic.herokuapp.com/images/${yourUUID}`

  let imageId = 884;

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  fetch(`https://randopic.herokuapp.com/images/${yourUUID}`)
    .then(resp => resp.json())
    .then(resp => makeImageDiv(resp))

    function makeImageDiv(imageObj){
      let imageDiv = document.querySelector('#image');
      imageDiv.src = imageObj.url;
      let likesDiv = document.querySelector('span');
      likesDiv.dataset.id = imageObj.id;
      likesDiv.innerText = imageObj.like_count;
      let likeButton = document.querySelector('#like_button');
      likeButton.dataset.id = imageObj.id;
      let likeInput = document.querySelector('#comment_input');
      likeInput.dataset.id = imageObj.id;
      let submitButton = document.querySelector('#submit');

      submitButton.addEventListener('click', function(event){
        event.preventDefault();
        let ul = document.querySelector('#comments');
        let li = document.createElement('li');
        li.innerText = document.querySelector('#comment_input').value;
        ul.append(li);  //show new comment on the front end
        let input = document.querySelector('#comment_input').value;
        let comment = {image_id: imageId, content: input}
        makeBackEndChange(comment);
      })

      likeButton.addEventListener('click', function(event){
        event.preventDefault();
        let makeChangeFrontEnd = document.querySelector('span');
        let turnIntoNum = parseInt(document.querySelector('span').innerText);
        turnIntoNum++;
        makeChangeFrontEnd.innerText = turnIntoNum;
        postIncreaseLikes({image_id: imageId});
      });
    }

    function postIncreaseLikes(objKey){
      fetch('https://randopic.herokuapp.com/likes', {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(objKey)
      })
      .then(response => response.json())
      .then(response => console.log(response))
    }

    function makeBackEndChange(commentObj){
      fetch('https://randopic.herokuapp.com/comments', {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(commentObj)
      })
      .then(response => response.json())
      .then(response => console.log(response))
    }
})
