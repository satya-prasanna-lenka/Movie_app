const useGeneres = (selectedGenetes) => {
  if (selectedGenetes.length < 1) {
    return "";
  }
  const GeneresId = selectedGenetes.map((id) => id.id);

  return GeneresId.reduce((acc, curr) => acc + "," + curr);
};

export default useGeneres;
