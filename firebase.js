const Login = document.querySelector("#Login");
const nombreUsuario = document.querySelector("#nombreUsuario");
const btnSesion = document.querySelector("#btnSesion");
const Sesion = document.querySelector("#Sesion");
const Mensaje = document.querySelector("#txtMensaje");

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    //Login.innerHTML = ``
    nombreUsuario.innerHTML = user.displayName;
    sessionStorage.setItem("userID", user.displayName);
    cerrarSesion();
  } else {
    btnSesion.classList =
      "bg-white font-bold text-black w-full py-3 rounded-full mb-2 border-solid border-4 border-black justify-items-center";
    btnSesion.innerHTML = `<img class = "mr-2 inline-block" src="/img/google.png" width= "8%" height= "8%" alt="Logo"/>`;
    btnSesion.innerHTML += "Iniciar Sesión";
    iniciarSesion();
  }
});

const iniciarSesion = () => {
  btnSesion.addEventListener("click", async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      await firebase.auth().signInWithPopup(provider);
    } catch (error) {
      console.log(error);
    }
    window.location.reload();
  });
};
const cerrarSesion = () => {
  btnSesion.addEventListener("click", () => {
    firebase.auth().signOut();
    sessionStorage.removeItem("userID");
    window.location.reload();
  });
};
