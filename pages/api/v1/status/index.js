function status(request, response) {
  response.status(200).json({ chave: "Eu gosto muito de comer um bolão" });
}

export default status;
