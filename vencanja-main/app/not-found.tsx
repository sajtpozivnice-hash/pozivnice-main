export default function NotFound() {
  return (
    <div className="flex h-screen items-center justify-center flex-col gap-4">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-lg text-gray-500">Ovaj šablon ne postoji</p>

      <a href="/pozivnice" className="px-4 py-2 bg-black text-white rounded">
        Idi na izbor šablona
      </a>
    </div>
  );
}
