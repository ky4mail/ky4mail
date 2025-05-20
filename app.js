function toggleGreeting() {
  const greeting = document.getElementById('greeting');
  greeting.textContent = greeting.textContent === 'Hello, World!' ? 'Welcome to PWA!' : 'Hello, World!';
}