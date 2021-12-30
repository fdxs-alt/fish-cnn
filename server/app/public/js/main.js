const fileInput = document.querySelector(".file-input");
const btn = document.querySelector(".file-button");
const imageContainer = document.querySelector(".images-container");

const createLoadingIndicator = () => {
  const loader = document.createElement("p");

  loader.className = "loader-indicator";
  loader.textContent = "Loading...";

  imageContainer.appendChild(loader);

  return loader;
};

const createErrorElement = (error) => {
  const errorElement = document.createElement("span");
  errorElement.className = "error-indicator";
  imageContainer.appendChild(errorElement);
  errorElement.textContent = error.message;
};

const handleImageSend = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const loader = createLoadingIndicator();

  try {
    const response = await fetch("/file", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    createResult(file, data);
  } catch (error) {
    createErrorElement(error);
  } finally {
    imageContainer.removeChild(loader);
  }
};

const createResult = (file, data) => {
  const container = document.createElement("figure");
  const image = document.createElement("img");
  const result = document.createElement("span");

  result.textContent = data.result;
  result.className = "result";

  const url = URL.createObjectURL(file);
  image.loading = "lazy";
  image.src = url;

  container.className = "result-container";

  container.appendChild(image);
  container.appendChild(result);

  imageContainer.appendChild(container);
};

fileInput.addEventListener("change", async (e) => {
  const file = e.target.files[0];

  if (file) {
    await handleImageSend(file);
  }
});

btn.addEventListener("click", () => {
  fileInput.click();
});
