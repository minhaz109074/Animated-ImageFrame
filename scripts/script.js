"use strict";

//global imageframe selector
const imageFrame = document.querySelector(".imageframe");

/* .........create imgages inside imagframe conatiner........... */
let itr = 1;
let left = 0;

for (; itr <= 54; itr++) {
  let imgDiv = document.createElement("div");
  imgDiv.classList.add("img");
  imgDiv.dataset.index = `${itr}`;

  // innerHTML
  imgDiv.innerHTML = `<img src="./images/grid/${itr}.jpg" alt="" />`;
  imageFrame.append(imgDiv);
}

/* ..............show image in grid................... */

function displayImageGrid(imageFrame) {
  const container = document.querySelector(".imageframe-container");
  const containerStyle = window.getComputedStyle(container);
  let containerWidth = parseFloat(containerStyle.width);
  let numOfImages = getColumns(containerWidth);
  jQuery(".content").css("height", "");

  const imageData = imageFrame.querySelectorAll("div");
  for (; itr <= imageData.length; itr++) {
    imageData[itr].removeAttribute("style");
  }

  let width = containerWidth / numOfImages;
  const content = document.querySelector(".content");
  const contentStyle = window.getComputedStyle(content);
  let contentHeight = parseInt(contentStyle.height);

  for (; itr <= imageData.length; itr++) {
    imageData[itr].style.width = `${width}px`;
    imageData[itr].style.height = `${width}px`;
    // jQuery(imageData).eq(itr).css({
    //   width: width,
    //   height: width,
    // });
  }
  if (contentHeight % width != 0) {
    contentHeight = Math.ceil(contentHeight / width) * width;
    content.style.height = `${contentHeight}px`;
    content.style.margin = `${width}px`;
    content.style.boxSizing = "border-box";
    container.height = `${contentHeight + width * 2}px`;
  }

  let topImages = numOfImages;
  let bottomImages = numOfImages;
  let leftImages = contentHeight / width;
  let rightImages = contentHeight / width;
  let totalImages = topImages + bottomImages + leftImages + rightImages;
  let endPos = contentHeight + width;
  let border = parseInt(contentStyle.width) + width;
  let curPos = 0;
  let i = 0;
  for (; i < topImages; i++) {
    // imageData[i].style.width = `${width}px`;
    // imageData[i].style.height = `${width}px`;
    // imageData[i].style.left = `${width * i}px`;
    // imageData[i].style.top = 0;
    // imageData[i].style.display = "block";
    jQuery(imageData)
      .eq(i)
      .css({
        width: width,
        height: width,
        left: width * i,
        top: 0,
      })
      .show();
  }
  curPos = topImages;
  i = 0;
  for (; i < rightImages; i++) {
    // imageData[i + curPos].style.left = `${border}px`;
    // imageData[i + curPos].style.top = `${width * (i + 1)}px`;
    // imageData[i + curPos].style.display = "block";
    // imageData[i + curPos].style.width = `${width}px`;
    // imageData[i + curPos].style.height = `${width}px`;
    jQuery(imageData)
      .eq(i + curPos)
      .css({
        width: width,
        height: width,
        left: border,
        top: width * (i + 1),
      })
      .show();
  }
  curPos = topImages + rightImages;
  i = 0;
  for (; i < bottomImages; i++) {
    // imageData[i + curPos].style.left = `${width * (bottomImages - (i + 1))}px`;
    // imageData[i + curPos].style.top = `${endPos}px`;
    // imageData[i + curPos].style.display = "block";
    // imageData[i + curPos].style.width = `${width}px`;
    // imageData[i + curPos].style.height = `${width}px`;
    jQuery(imageData)
      .eq(i + curPos)
      .css({
        width: width,
        height: width,
        left: width * (bottomImages - (i + 1)),
        top: endPos,
      })
      .show();
  }
  curPos = topImages + rightImages + bottomImages;
  i = 0;
  for (; i < leftImages; i++) {
    // imageData[i + curPos].style.left = 0;
    // imageData[i + curPos].style.top = `${width * (leftImages - i)}px`;
    // imageData[i + curPos].style.display = "block";
    // imageData[i + curPos].style.width = `${width}px`;
    // imageData[i + curPos].style.height = `${width}px`;
    jQuery(imageData)
      .eq(i + curPos)
      .css({
        width: width,
        height: width,
        left: 0,
        top: width * (leftImages - i),
      })
      .show();
  }
}
/*  ..............event listener................ */

displayImageGrid(imageFrame);
function resizeListener() {
  displayImageGrid(imageFrame);
}

window.addEventListener("resize", resizeListener);
//window.addEventListener("load", resizeListener);

/* ................get columns according to width of conatiner............ */
function getColumns(c_w) {
  let column = 9;
  if (c_w >= 1050) {
    column = 10;
  } else {
    if (c_w >= 850) {
      column = 9;
    } else {
      if (c_w >= 650) {
        column = 8;
      } else {
        if (c_w >= 450) {
          column = 7;
        } else {
          if (c_w >= 300) {
            column = 9;
          }
        }
      }
    }
  }
  return column;
}

/* .........animation................ */

function SwapImages() {
  const randomNumber = Math.trunc(Math.random() * 20) + 1;
  let f = 0,
    s = 0;
  if (randomNumber === 10 || randomNumber === 20) {
    s = randomNumber;
    f = randomNumber - 1;
  } else {
    f = randomNumber;
    s = randomNumber + 1;
  }
  // Get an element using data-index attribute
  const temp1 = document.querySelector(`[data-index='${f}']`);
  let temp1Left = temp1.style.left;
  let dataIndex1 = temp1.dataset.index;
  const temp2 = document.querySelector(`[data-index='${s}']`);
  let temp2Left = temp2.style.left;
  let dataIndex2 = temp2.dataset.index;

  temp1.classList.add("imgTransition");
  temp2.classList.add("imgTransition");
  // swap value
  let temp = temp1Left;
  temp1.style.left = temp2.style.left;
  temp2.style.left = temp;

  // swap data index
  temp = dataIndex1;
  temp1.dataset.index = temp2.dataset.index;
  temp2.dataset.index = temp;
}

setInterval(SwapImages, 3000);
