
document.querySelectorAll(".skill-item").forEach(item => {

  const button = item.querySelector(".skill-toggle");

  button.setAttribute("aria-expanded", "false");

  button.addEventListener("click", () => {

    item.classList.toggle("active");

    const aberto = item.classList.contains("active");

    button.setAttribute("aria-expanded", String(aberto));

    button.querySelector("span").textContent =
      aberto ? "−" : "+";

  });

});


function scrollToSection(id){
 document.getElementById(id).scrollIntoView({behavior:'smooth'})
}

const cards = document.querySelectorAll('.card');
window.addEventListener('scroll', () => {
 cards.forEach(card => {
   const top = card.getBoundingClientRect().top;
   if(top < window.innerHeight - 50){
     card.classList.add('show');
   }
 });
});

fetch('https://api.github.com/users/Eliezer151020/repos')
.then(res => res.json())
.then(data => {
 const repos = document.getElementById('repos');
 data.slice(0,6).forEach(repo => {
   repos.innerHTML += `
   <div class="card show">
     <h3>${repo.name}</h3>
     <p>${repo.description || 'Projeto profissional'}</p>
     <a href="${repo.html_url}" target="_blank" style="color:#00ffcc">Ver projeto</a>
   </div>`;
 });
});
