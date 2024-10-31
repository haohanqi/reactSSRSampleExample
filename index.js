document.addEventListener("DOMContentLoaded", async (event) => {
  console.log("DOM fully loaded and parsed");
  const response = await fetch("http://localhost:3001/api/todo");
  if (response.ok) {
    const html = await response.text();
    const todoContainer = document.createElement("section");
    todoContainer.innerHTML = html;
    document.querySelector("body").appendChild(todoContainer);
  }
});
