/*I use this function in order to know if some element is a child or nested child for another element,
I want this in order to know if the click was inside an element or outside (to decide wether to close the list or not for example)...*/

const isChildOf = (parent, child, except) => {
  //parent is an array
  /*except is an array, except element can be a toggle button or something that I don't want it to close ... I want to skip that button and not close a list when click that toggle, so I want to return true*/

  if (except) {
    for (let i = 0; i < except.length; i++) {
      if (child == except[i]) return true;
    }
  }

  if (
    child.nodeName == "BUTTON" &&
    child.parentElement.classList.contains("buttons-area")
  ) {
    return true;
  }

  let node = child.parentElement;
  for (let i = 0; i < parent.length; i++) {
    while (node) {
      if (child == parent[i]) return true;
      if (node == parent[i]) return true;
      node = node.parentElement;
    }
    node = child.parentElement;
  }

  return false;
};

export default isChildOf;
