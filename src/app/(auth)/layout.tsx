export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div
        className="pt-8 pl-75 fixed">{children}</div>
      </body>
    </html>
  );
}
