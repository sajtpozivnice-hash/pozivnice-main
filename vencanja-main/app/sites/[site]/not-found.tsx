export default function SiteNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-3xl font-bold">Pozivnica nije pronađena</h1>
      <p className="max-w-md text-lg text-gray-600">
        Nema objavljenog projekta za ovaj subdomain. U Supabase tabeli{" "}
        <code>projects</code> subdomain mora tačno da odgovara (npr.{" "}
        <code>ana-marko</code>) i <code>published</code> mora biti{" "}
        <code>true</code>.
      </p>
    </div>
  );
}
