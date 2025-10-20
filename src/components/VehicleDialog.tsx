import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Vehicle } from "@/types";

const vehicleSchema = z.object({
  brand: z.string().min(1, "Marca é obrigatória"),
  yearManufacture: z.coerce.number().min(1900, "Ano inválido").max(new Date().getFullYear() + 1, "Ano inválido"),
  description: z.string().min(1, "Descrição é obrigatória"),
  sold: z.boolean(),
});

type VehicleFormValues = z.infer<typeof vehicleSchema>;

interface VehicleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: VehicleFormValues) => Promise<void>;
  vehicle?: Vehicle;
}

export default function VehicleDialog({
  open,
  onOpenChange,
  onSubmit,
  vehicle,
}: VehicleDialogProps) {
  const form = useForm<VehicleFormValues>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      brand: "",
      yearManufacture: new Date().getFullYear(),
      description: "",
      sold: false,
    },
  });

  useEffect(() => {
    if (open) {
      if (vehicle) {
        form.reset({
          brand: vehicle.brand,
          yearManufacture: vehicle.yearManufacture,
          description: vehicle.description,
          sold: vehicle.sold,
        });
      } else {
        form.reset({
          brand: "",
          yearManufacture: new Date().getFullYear(),
          description: "",
          sold: false,
        });
      }
    }
  }, [open, vehicle, form]);

  const handleSubmit = async (data: VehicleFormValues) => {
    await onSubmit(data);
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            {vehicle ? "Editar Veículo" : "Adicionar Veículo"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground">Marca</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: Ford"
                      className="bg-secondary border-border text-foreground"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="yearManufacture"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground">Ano de Fabricação</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Ex: 2020"
                      className="bg-secondary border-border text-foreground"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground">Descrição</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: Ford Mustang GT Premium"
                      className="bg-secondary border-border text-foreground"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sold"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border border-border p-4 bg-secondary">
                  <div className="space-y-0.5">
                    <FormLabel className="text-muted-foreground">Vendido</FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex gap-3 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="border-border text-foreground hover:bg-secondary"
              >
                Cancelar
              </Button>
              <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
                {vehicle ? "Atualizar" : "Adicionar"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}