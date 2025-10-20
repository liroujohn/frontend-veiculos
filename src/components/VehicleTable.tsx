import { Vehicle } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

interface VehicleTableProps {
  vehicles: Vehicle[];
  onEdit: (vehicle: Vehicle) => void;
  onDelete: (vehicle: Vehicle) => void;
}

export function VehicleTable({ vehicles, onEdit, onDelete }: VehicleTableProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (vehicles.length === 0) {
    return (
      <Card className="bg-card border-border shadow-lg">
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground text-lg">
            Nenhum veículo encontrado
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card border-border shadow-lg overflow-hidden">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-secondary/50">
                <TableHead className="text-muted-foreground font-semibold">ID</TableHead>
                <TableHead className="text-muted-foreground font-semibold">Marca</TableHead>
                <TableHead className="text-muted-foreground font-semibold">Descrição</TableHead>
                <TableHead className="text-muted-foreground font-semibold">Ano</TableHead>
                <TableHead className="text-muted-foreground font-semibold">Vendido?</TableHead>
                <TableHead className="text-muted-foreground font-semibold">Criado em</TableHead>
                <TableHead className="text-muted-foreground font-semibold text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vehicles.map((vehicle) => (
                <TableRow
                  key={vehicle.id}
                  className="border-border hover:bg-secondary/50 transition-colors"
                >
                  <TableCell className="font-medium text-foreground">
                    {vehicle.id}
                  </TableCell>
                  <TableCell className="text-foreground">{vehicle.brand}</TableCell>
                  <TableCell className="text-foreground">
                    {vehicle.description}
                  </TableCell>
                  <TableCell className="text-foreground">
                    {vehicle.yearManufacture}
                  </TableCell>
                  <TableCell>
                    {vehicle.sold ? (
                      <Badge className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                        Sim
                      </Badge>
                    ) : (
                      <Badge className="bg-success text-success-foreground hover:bg-success/90">
                        Não
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDate(vehicle.createdAt)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEdit(vehicle)}
                        className="border-border text-foreground hover:bg-secondary"
                      >
                        <Pencil className="h-4 w-4 mr-1" />
                        Editar
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => onDelete(vehicle)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Excluir
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}