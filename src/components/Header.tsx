import { Car } from "lucide-react";

export function Header() {
  return (
    <header className="bg-card border-b border-border shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-4">
          <div className="bg-primary rounded-lg p-3 shadow-lg">
            <Car className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">
            Cadastro de Veículos
          </h1>
        </div>
      </div>
    </header>
  );
}
