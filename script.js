document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".join-form");
    const socket = new WebSocket("ws://localhost:3002"); 
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const username = form.username.value.trim();
      const password = form.password.value.trim();
      if (!username || !password) {
        alert("Please fill in all fields.");
        return;
      }
  
      try {
        const userData = { username, password };
        socket.send(JSON.stringify({ type: "join", data: userData }));
        alert("Joining the game...");
      } catch (error) {
        console.error("Error joining the game:", error);
      }
    });
    socket.addEventListener("open", () => {
      console.log("Connected to the game server.");
    });
  
    socket.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);
  
      if (message.type === "update") {
        console.log("Game update:", message.data);
      }
    });
  
    socket.addEventListener("error", (error) => {
      console.error("WebSocket error:", error);
    });
  
    socket.addEventListener("close", () => {
      console.log("Disconnected from the game server.");
    });
  });
  