import ModalContainer from "@/components/dashboard/Modal/ModalContainer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PotvrdjeniDolasci from "@/components/dashboard/PotvrdjeniDolasci/PotvrdjeniDolasci";
import Sections from "@/components/dashboard/Sections/Sections";
import Images from "@/components/dashboard/Images/Images";
import RasporedSedenja from "@/components/dashboard/RasporedSedenja/RasporedSedenja";
import LogoutButton from "@/components/dashboard/LogoutButton";

export type DashboardCurrentView =
  | "sections"
  | "images"
  | "confirmations"
  | "seating";

export const UserLayout = () => {
  return (
    <div className="mx-auto w-full min-w-0 max-w-7xl space-y-4 overflow-x-hidden p-3 sm:p-4 md:p-6">
      <div className="flex items-center justify-end">
        <LogoutButton />
      </div>

      <Tabs defaultValue="sections" className="w-full min-w-0 gap-4">
        <div className="w-full min-w-0 overflow-x-auto overscroll-x-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <TabsList className="h-auto min-h-9 w-max max-w-none gap-1 p-1">
            <TabsTrigger
              className="shrink-0 px-3 py-2 text-xs sm:text-sm"
              value="sections"
            >
              Sekcije
            </TabsTrigger>
            <TabsTrigger
              className="shrink-0 px-3 py-2 text-xs sm:text-sm"
              value="images"
            >
              Slike
            </TabsTrigger>
            <TabsTrigger
              className="shrink-0 px-3 py-2 text-xs sm:text-sm"
              value="coming"
            >
              Gosti
            </TabsTrigger>
            <TabsTrigger
              className="shrink-0 px-3 py-2 text-xs sm:text-sm"
              value="seating"
            >
              <span className="sm:hidden">Raspored</span>
              <span className="hidden sm:inline">Raspored Stolova i Sedenja</span>
            </TabsTrigger>
            <TabsTrigger
              className="shrink-0 px-3 py-2 text-xs sm:text-sm"
              value="finansije"
            >
              Finansije
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="sections" className="min-w-0">
          <Card className="min-w-0">
            <CardHeader className="gap-2">
              <CardTitle>Sekcije</CardTitle>
              <CardDescription>
                Ovde možete prilagoditi izgled i sadržaj vaše pozivnice.
                Uključujte ili isključujte sekcije, menjajte tekstove, datume,
                lokacije, fontove, boje i ostala podešavanja kako biste kreirali
                pozivnicu po svojoj meri.
              </CardDescription>
            </CardHeader>
            <CardContent className="min-w-0 p-3 text-sm text-muted-foreground sm:p-4">
              <Sections />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="images" className="min-w-0">
          <Card className="min-w-0">
            <CardHeader className="gap-2">
              <CardTitle>Slike</CardTitle>
              <CardDescription>
                Pregled fotografija koje su gosti podelili. Ovde možete
                pregledati sve fotografije koje su gosti otpremili putem
                pozivnice, preuzeti ih na svoj uređaj ili ih obrisati.
                Uređivanje fotografija nije dostupno.
              </CardDescription>
            </CardHeader>
            <CardContent className="min-w-0 p-3 text-sm text-muted-foreground sm:p-4">
              <Images />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="coming" className="min-w-0">
          <Card className="min-w-0">
            <CardHeader className="gap-2">
              <CardTitle>Gosti</CardTitle>
              <CardDescription>
                Upravljajte svim potvrdama dolaska na jednom mestu. Pregledajte
                odgovore gostiju, dodajte goste koji nisu sami potvrdili
                dolazak, uredite podatke i status svih gostiju i preuzmite
                spisak gostiju po abecednom redu ili prema trenutnom rasporedu
                koji ste napravili.
              </CardDescription>
            </CardHeader>
            <CardContent className="min-w-0 space-y-4 p-3 text-sm text-muted-foreground sm:p-4">
              <PotvrdjeniDolasci />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seating" className="min-w-0">
          <Card className="min-w-0">
            <CardHeader className="gap-2">
              <CardTitle className="text-lg sm:text-xl">
                Raspored Stolova i Sedenja
              </CardTitle>
              <CardDescription>
                Kreirajte i organizujte raspored sedenja za vaše goste.
                Dodajte stolove, rasporedite goste po mestima, po potrebi
                izmenite raspored i izvezite ga kao PDF dokument spreman za
                štampu.
              </CardDescription>
            </CardHeader>
            <CardContent className="min-w-0 p-3 text-sm text-muted-foreground sm:p-4">
              <RasporedSedenja />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="finansije" className="min-w-0">
          <Card className="min-w-0">
            <CardHeader className="gap-2">
              <CardTitle>Finansije</CardTitle>
              <CardDescription>
                Pregled i upravljanje finansijama vezanim za vaše venčanje.
              </CardDescription>
            </CardHeader>
            <CardContent className="min-w-0 p-3 text-sm text-muted-foreground sm:p-4" />
          </Card>
        </TabsContent>
      </Tabs>
      <ModalContainer />
    </div>
  );
};
