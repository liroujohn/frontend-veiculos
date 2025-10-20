import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Filter, RotateCcw } from "lucide-react";

const filterSchema = z.object({
  brand: z.string().optional(),
  decade: z.string().optional(),
  sold: z.enum(["any", "true", "false"]).optional(),
  registeredLastWeek: z.enum(["any", "true", "false"]).optional(),
});

type FilterFormValues = z.infer<typeof filterSchema>;

interface VehicleFilterProps {
  onFilterSubmit: (data: FilterFormValues) => void;
}

export function VehicleFilter({ onFilterSubmit }: VehicleFilterProps) {
  const form = useForm<FilterFormValues>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      brand: "",
      decade: "",
      sold: "any",
      registeredLastWeek: "any",
    },
  });

  const handleClear = () => {
    form.reset();
    onFilterSubmit({
      brand: "",
      decade: "",
      sold: "any",
      registeredLastWeek: "any",
    });
  };

  return (
    <Card className="bg-card border-border shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Filter className="h-5 w-5 text-primary" />
          Filtros
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onFilterSubmit)}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                name="decade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground">Década</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Ex: 2010"
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
                  <FormItem className="space-y-3">
                    <FormLabel className="text-muted-foreground">Vendido?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="any" />
                          </FormControl>
                          <FormLabel className="font-normal text-foreground cursor-pointer">
                            Todos
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="true" />
                          </FormControl>
                          <FormLabel className="font-normal text-foreground cursor-pointer">
                            Sim
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="false" />
                          </FormControl>
                          <FormLabel className="font-normal text-foreground cursor-pointer">
                            Não
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="registeredLastWeek"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-muted-foreground">
                      Cadastrado esta semana?
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="any" />
                          </FormControl>
                          <FormLabel className="font-normal text-foreground cursor-pointer">
                            Todos
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="true" />
                          </FormControl>
                          <FormLabel className="font-normal text-foreground cursor-pointer">
                            Sim
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="false" />
                          </FormControl>
                          <FormLabel className="font-normal text-foreground cursor-pointer">
                            Não
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleClear}
                className="border-border text-foreground hover:bg-secondary"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Limpar
              </Button>
              <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Filter className="h-4 w-4 mr-2" />
                Pesquisar
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
