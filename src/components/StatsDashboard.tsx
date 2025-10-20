import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VehicleService } from "@/services/vehicleService";
import { UnsoldCount, Vehicle, VehiclesPerDecade, VehiclesPerBrand } from "@/types";
import { TrendingUp, Calendar, Factory, BarChart3 } from "lucide-react";

export function StatsDashboard() {
  const [unsoldCount, setUnsoldCount] = useState<UnsoldCount | null>(null);
  const [lastWeekVehicles, setLastWeekVehicles] = useState<Vehicle[]>([]);
  const [byDecade, setByDecade] = useState<VehiclesPerDecade[]>([]);
  const [byBrand, setByBrand] = useState<VehiclesPerBrand[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const [unsold, lastWeek, decade, brand] = await Promise.all([
          VehicleService.getUnsoldCount(),
          VehicleService.getRegisteredLastWeek(),
          VehicleService.getDistributionByDecade(),
          VehicleService.getDistributionByBrand(),
        ]);
        setUnsoldCount(unsold);
        setLastWeekVehicles(lastWeek);
        setByDecade(decade);
        setByBrand(brand);
      } catch (error) {
        console.error("Erro ao buscar estatísticas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="bg-card border-border animate-pulse">
            <CardHeader className="h-20"></CardHeader>
            <CardContent className="h-24"></CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="bg-card border-border shadow-lg hover:shadow-xl transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Não Vendidos
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-foreground">
            {unsoldCount?.unsoldCount || 0}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            veículos disponíveis
          </p>
        </CardContent>
      </Card>

      <Card className="bg-card border-border shadow-lg hover:shadow-xl transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Última Semana
          </CardTitle>
          <Calendar className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-foreground">
            {lastWeekVehicles.length}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            cadastrados nos últimos 7 dias
          </p>
        </CardContent>
      </Card>

      <Card className="bg-card border-border shadow-lg hover:shadow-xl transition-shadow md:col-span-2 lg:col-span-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Por Década
          </CardTitle>
          <BarChart3 className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {byDecade.map((item) => (
              <li
                key={item.decade}
                className="flex justify-between text-sm text-foreground"
              >
                <span className="text-muted-foreground">{item.decade}s</span>
                <span className="font-semibold">{item.quantity}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="bg-card border-border shadow-lg hover:shadow-xl transition-shadow md:col-span-2 lg:col-span-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Por Fabricante
          </CardTitle>
          <Factory className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {byBrand.slice(0, 5).map((item) => (
              <li
                key={item.brand}
                className="flex justify-between text-sm text-foreground"
              >
                <span className="text-muted-foreground">{item.brand}</span>
                <span className="font-semibold">{item.quantity}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
