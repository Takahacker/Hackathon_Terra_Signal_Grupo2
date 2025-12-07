import logo from "@/assets/logo.png";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Terra Signal" className="h-8 w-8" />
            <span className="text-lg font-semibold text-primary">Terra Signal</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Terra Signal. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
