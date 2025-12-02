export function Footer() {
  return (
    <footer className="mt-12 py-6 text-center text-gray-400 text-sm opacity-70">
      Criado por{" "}
      <span className="text-cyan-400 font-semibold">Alison Souza</span> —{" "}
      {new Date().getFullYear()}
    </footer>
  );
}
