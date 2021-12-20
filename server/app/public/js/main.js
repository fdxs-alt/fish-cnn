const fileInput = document.querySelector(".file-input");
const btn = document.querySelector(".file-button");
const imageContainer = document.querySelector(".images-container");

btn.addEventListener("click", () => {
  fileInput.click();
});

const handleImageSend = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await fetch("/file", {
    method: "POST",
    body: formData,
  });
  const data = await response.json();

  console.log(data);
};

const createSendImage = (file) => {
  const image = document.createElement("img");
  const url = URL.createObjectURL(file);
  image.src = url;

  imageContainer.appendChild(image);
};

fileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];

  if (file) {
    handleImageSend(file);
    createSendImage(file);
  }
});
