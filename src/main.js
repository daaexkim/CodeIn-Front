const scrollSections = document.querySelectorAll(".scroll-section");  // 🔴 'scroll' 대신 'scrollSections'로 명확하게 변수 이름 변경

document.addEventListener("scroll", function() {
    scrollSections.forEach((section) => {  // 🔴 'paragraphs' 대신 'scrollSections' 사용
        if (isInView(section)) {
            section.classList.add("scroll-section--visible");  // 🔴 visible 클래스 추가
        }
    });
});

function isInView(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.bottom > 0 &&
        rect.top < (window.innerHeight - 150 || document.documentElement.clientHeight - 150)
    );
}
