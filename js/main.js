document.addEventListener("DOMContentLoaded", () => {
  const resume = document.querySelector("#resume");
  const editableElements = resume.querySelectorAll("[data-editable-id]");

  editableElements.forEach((el) => {
    const id = el.getAttribute("data-editable-id");
    const saved = localStorage.getItem(`editable_${id}`);
    if (saved !== null) {
      el.textContent = saved;
    }
  });

  editableElements.forEach((el) => {
    el.setAttribute("contenteditable", "true");

    el.addEventListener("input", () => {
      const id = el.getAttribute("data-editable-id");
      localStorage.setItem(`editable_${id}`, el.textContent);

      el.classList.remove("animated-change");
      void el.offsetWidth;
      el.classList.add("animated-change");
    });

    el.addEventListener("animationend", () => {
      el.classList.remove("animated-change");
    });
  });

  window.generatePDF = function () {
    const resume = document.getElementById("resume");

    const opt = {
      margin: 0.5,
      filename: "resume.pdf",
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 4, useCORS: true, logging: true },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };
    html2pdf()
      .from(resume)
      .set(opt)
      .toPdf()
      .get("pdf")
      .then(function (pdf) {
        setTimeout(() => {
          pdf.save("resume.pdf");
        }, 500); 
      })
  };
});
