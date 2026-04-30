export default async function TestPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--light)] to-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Test Dynamic Route
        </h1>
        <p className="text-gray-600 mb-6">
          Test ID: {id}
        </p>
        <p className="text-gray-600">
          This is a test to see if dynamic routes work at all.
        </p>
      </div>
    </div>
  );
}
