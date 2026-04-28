import { syncUser } from "@/lib/syncUser";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await syncUser();
  return (
    <html lang="en">
      <body>
       
          {children}
      </body>
    </html>
  );
}
