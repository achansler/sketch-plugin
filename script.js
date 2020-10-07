const main = document.querySelector('.main');
const sidebar = document.querySelector('.sidebar');
const closeButton = document.querySelector('.close_btn');
const removeHighlight = document.querySelector('.remove');
const spans = document.querySelectorAll('span');
const globalCommentButton = document.querySelector('.comment_btn');
const floatingCommentBubble = document.querySelector('.floating_comment_btn');
const modesDropdown = document.getElementById('mode_dropdown');
const modes = document.querySelectorAll('option');
let a = 0;


// ----------- COMMENT WITHOUT SELECTION ----------- //

function handleGlobalComment() {
  const commentBubble = document.createElement('div');
  const closeBtn = document.createElement('button');
  const commentParagraph = document.createElement('p');
  const form = document.createElement('form');
  const input = document.createElement('textarea');
  const AddCommentBtn = document.createElement('input');

  AddCommentBtn.setAttribute('type', 'submit');
  AddCommentBtn.textContent = 'Add Comment';
  AddCommentBtn.classList.add('add_btn');


  closeBtn.textContent = 'Remove';
  closeBtn.classList.add('remove_btn');
  commentBubble.classList.add('dialog');
  commentParagraph.classList.add('added_comment');

  form.append(input, AddCommentBtn);
  commentBubble.append(closeBtn, commentParagraph, form);
  sidebar.appendChild(commentBubble);

  document.querySelector('textarea').focus();
  
  closeBtn.addEventListener('click', function() {
    commentBubble.remove();
  });

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    if(input.value === '') {
      console.log('you gotta type something, bro')
      return;
    } else {
      commentParagraph.textContent = input.value;
      input.remove();
    }
  });

}


// ----------- COMMENT WITH SELECTION ----------- //

function handleClickComment() {
  const commentBubble = document.createElement('div');
  const closeBtn = document.createElement('button');
  const commentParagraph = document.createElement('p');
  const form = document.createElement('form');
  const input = document.createElement('textarea');
  const AddCommentBtn = document.createElement('input');
 
  var selection;

  let number = a++;

  AddCommentBtn.setAttribute('type', 'submit');
  AddCommentBtn.textContent = 'Add Comment';
  AddCommentBtn.classList.add('add_btn');

  closeBtn.textContent = 'Remove';
  closeBtn.classList.add('remove_btn');
  commentBubble.classList.add('dialog',number);
  commentParagraph.classList.add('added_comment');

  form.append(input, AddCommentBtn);
  commentBubble.append(closeBtn, commentParagraph, form);
  sidebar.appendChild(commentBubble);


  //Handle Highlight

  //Get the selected stuff
  if (window.getSelection)
      selection = window.getSelection();
  else if (typeof document.selection != "undefined")
      selection = document.selection;

  //Get a the selected content, in a range object
  var range = selection.getRangeAt(0);

  //If the range spans some text, and inside a tag, set its css class.
  if (range && !selection.isCollapsed) {
      if (selection.anchorNode.parentNode === selection.focusNode.parentNode) {
          var span = document.createElement('span');
          span.classList.add('highlight',number);
          range.surroundContents(span);
          console.log(selection);
      }
  }

  function handleRemoveHighlight() {
    var spans = document.querySelectorAll('span');
    spans.forEach(function(span) {
      if(span.classList.contains(number) === commentBubble.classList.contains(number)) {
       span.classList.remove('highlight',number);
      }
    });
  }

  document.querySelector('textarea').focus();

  closeBtn.addEventListener('click', function() {
    commentBubble.remove();
  });

  closeBtn.addEventListener('click', handleRemoveHighlight);

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    if(input.value === '') {
      console.log('you gotta type something, bro')
      return;
    } else {
      commentParagraph.textContent = input.value;
      input.remove();
    }
  });

}

  // ----------- TO GET THE X COORDINATE OF THE BUBBLE AND PLACE IT ----------- //

  function pageY(event){
    let floatingCommentBubbleHeight = floatingCommentBubble.offsetHeight;
    console.log(floatingCommentBubbleHeight);
    var y = Math.floor(event.pageY);
    floatingCommentBubble.style.top = `${y}px`;
  }

  function opacityChange(){
    floatingCommentBubble.classList.add('floating_comment_btn_visbible');
  }

  function opacityChangeUp(){
    floatingCommentBubble.classList.remove('floating_comment_btn_visbible');
  }

// ----------- Suggestion Mode ----------- //

function handleChange(event){
  if(event.target.value === 'Suggesting') {
    console.log(`You're now suggesting`);
    main.addEventListener('click', function() {
      const editor = document.querySelector('.editor');
      editor.insertAdjacentHTML('afterbegin', '<div><p>This is some text</p></div>');
    })
  } else {
    console.log(event.target.value); 
   }
}


// modesDropdown.addEventListener('click', clickToSuggest);
modesDropdown.addEventListener('change', handleChange);
main.addEventListener('click', pageY);
main.addEventListener('mousedown', opacityChangeUp);
main.addEventListener('mouseup', opacityChange);

floatingCommentBubble.addEventListener('click', handleClickComment);
globalCommentButton.addEventListener('click', handleGlobalComment);


