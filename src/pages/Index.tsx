import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { StatsDashboard } from "@/components/StatsDashboard";
import { VehicleFilter } from "@/components/VehicleFilter";
import { VehicleTable } from "@/components/VehicleTable";
import { Pagination } from "@/components/Pagination";
import { VehicleService } from "@/services/vehicleService";
import { Vehicle, VehicleFilterParams, VehicleFormData } from "@/types";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import VehicleDialog from "@/components/VehicleDialog";
import z from "zod";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Index = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [filters, setFilters] = useState<VehicleFilterParams>({});
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | undefined>();
  const { toast } = useToast();

  const [currentPage, setCurrentPage] = useState(1);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState<Vehicle | undefined>();

  const itemsPerPage = 5;
  const totalItems = 50;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const fetchVehicles = async () => {
    setLoading(true);
    try {
      const params = {
        ...filters,
        page: currentPage,
        size: itemsPerPage,
      };

      const response = await VehicleService.findByFilter(params);
      setVehicles(response);
    } catch (error) {
      console.error("Erro ao buscar veículos:", error);
      toast({
        title: "Erro",
        description: "Erro ao buscar veículos",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, [filters, currentPage]);

  const vehicleFilterFormSchema = z.object({
    brand: z.string().optional(),
    decade: z.string().optional(),
    sold: z.enum(["any", "true", "false"]).optional(),
    registeredLastWeek: z.enum(["any", "true", "false"]).optional(),
  });

  type VehicleFilterFormData = z.infer<typeof vehicleFilterFormSchema>;

  const handleFilterSubmit = (data: VehicleFilterFormData) => {
    const newFilters: VehicleFilterParams = {
      brand: data.brand || undefined,
      decade: data.decade ? parseInt(data.decade) : undefined,
      sold:
        data.sold === "any"
          ? undefined
          : data.sold === "true"
          ? true
          : data.sold === "false"
          ? false
          : undefined,
      registeredLastWeek:
        data.registeredLastWeek === "any"
          ? undefined
          : data.registeredLastWeek === "true"
          ? true
          : data.registeredLastWeek === "false"
          ? false
          : undefined,
    };

    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleAddVehicle = () => {
    setSelectedVehicle(undefined);
    setDialogOpen(true);
  };

  const handleEditVehicle = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setDialogOpen(true);
  };

  const handleDeleteVehicle = (vehicle: Vehicle) => {
    setVehicleToDelete(vehicle);
    setConfirmDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!vehicleToDelete) return;

    try {
      await VehicleService.delete(vehicleToDelete.id);
      toast({
        title: "Sucesso",
        description: "Veículo excluído com sucesso",
      });
      fetchVehicles();
    } catch (error) {
      console.error("Erro ao excluir veículo:", error);
      toast({
        title: "Erro",
        description: "Não foi possível excluir o veículo.",
        variant: "destructive",
      });
    } finally {
      setConfirmDialogOpen(false);
      setVehicleToDelete(undefined);
    }
  };


  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSubmitVehicle = async (data: VehicleFormData) => {
    try {
      if (selectedVehicle) {
        await VehicleService.update(selectedVehicle.id, data);
        toast({
          title: "Sucesso",
          description: "Veículo atualizado com sucesso",
        });
      } else {
        await VehicleService.create(data);
        toast({
          title: "Sucesso",
          description: "Veículo cadastrado com sucesso",
        });
      }
      fetchVehicles();
    } catch (error) {
      console.error("Erro ao salvar veículo:", error);
      toast({
        title: "Erro",
        description: "Erro ao salvar veículo",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8 space-y-8">
        <StatsDashboard />

        <VehicleFilter onFilterSubmit={handleFilterSubmit} />

        <div className="flex justify-end">
          <Button onClick={handleAddVehicle} className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Veículo
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            <VehicleTable
              vehicles={vehicles}
              onEdit={handleEditVehicle}
              onDelete={handleDeleteVehicle}
            />

            <div className="flex justify-center pt-4">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </>
        )}

        <VehicleDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          onSubmit={handleSubmitVehicle}
          vehicle={selectedVehicle}
        />

        <AlertDialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta ação não pode ser desfeita. Isso excluirá permanentemente o veículo
                {vehicleToDelete && ` ${vehicleToDelete.brand} (${vehicleToDelete.description})`}.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirmDelete}>
                Confirmar Exclusão
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

      </main>
    </div>
  );
};

export default Index;