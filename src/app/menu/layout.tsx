export default function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        backgroundColor: "#f2ede8",
        minHeight: "100dvh",
        position: "relative",
      }}
    >
      {children}
    </div>
  );
}
