const domApi = (() => {
  const form = document.getElementById('user-input');
  const showControls = () => {
    const gameInst = document.getElementById('instructions');
    const close = Array.from(gameInst.childNodes)[1];
    close.addEventListener('click', () => {
      form.classList.toggle('hidden');
      gameInst.classList.toggle('hidden');
    });

    gameInst.classList.toggle('hidden');
  };

  const hideControls = () => {};

  const isValid = (input) => input.length > 2;
  const getUsername = () => {
    const input = document.getElementById('username');

    return input.value;
  };

  const userInput = () => (isValid(getUsername()) ? getUsername() : 'Batman');

  const hideUserInput = () => {
    form.classList.toggle('hidden');
  };

  return {
    showControls,
    hideControls,
    userInput,
    hideUserInput,
  };
})();

export default domApi;
