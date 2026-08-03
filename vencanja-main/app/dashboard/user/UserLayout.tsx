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
import { Button } from "@/components/ui/button";
import { useDialog } from "@/components/dashboard/context/ModalContext";
import LogoutButton from "@/components/dashboard/LogoutButton";

export type DashboardCurrentView =
  | "sections"
  | "images"
  | "confirmations"
  | "seating";

export const UserLayout = () => {
  const { openModal } = useDialog();
  return (
    <div className="p-6">
      <LogoutButton />
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger className="p-5" value="sections">
            Sekcije
          </TabsTrigger>
          <TabsTrigger className="p-5" value="images">
            Slike
          </TabsTrigger>
          <TabsTrigger className="p-5" value="coming">
            Gosti
          </TabsTrigger>
          <TabsTrigger className="p-5" value="seating">
            Raspored Stolova i Sedenja
          </TabsTrigger>
          <TabsTrigger className="p-5" value="finansije">
            Finansije
          </TabsTrigger>
        </TabsList>
        <TabsContent value="sections">
          <Card>
            <CardHeader>
              <CardTitle>Sekcije</CardTitle>
              <CardDescription>
                Ovde možete prilagoditi izgled i sadržaj vaše pozivnice.
                Uključujte ili isključujte sekcije, menjajte tekstove, datume,
                lokacije, fontove, boje i ostala podešavanja kako biste kreirali
                pozivnicu po svojoj meri.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground p-4">
              <Sections />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="images">
          <Card>
            <CardHeader>
              <CardTitle>Slike</CardTitle>
              <CardDescription>
                Pregled fotografija koje su gosti podelili. Ovde možete
                pregledati sve fotografije koje su gosti otpremili putem
                pozivnice, preuzeti ih na svoj uređaj ili ih obrisati.
                Uređivanje fotografija nije dostupno.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <Images />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="coming">
          <Card>
            <CardHeader>
              <CardTitle>Gosti</CardTitle>
              <CardDescription>
                Upravljajte svim potvrdama dolaska na jednom mestu. Pregledajte
                odgovore gostiju, dodajte goste koji nisu sami potvrdili
                dolazak, uredite podatke i status svih gostiju i preuzmite
                spisak gostiju po abecednom redu ili prema trenutnom rasporedu
                koji ste napravili.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <div className="flex gap-3 justify-end align center">
                <Button
                  className="cursor-pointer"
                  onClick={() => openModal("add_guest")}
                >
                  Dodaj novog gosta
                </Button>
                <Button
                  className="cursor-pointer"
                  onClick={() => openModal("add_guest")}
                >
                  Preuzmi spisak
                </Button>
              </div>
              <PotvrdjeniDolasci />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="seating">
          <Card>
            <CardHeader>
              <CardTitle>Raspored Stolova i Sedenja</CardTitle>
              <CardDescription className="flex flex-row  gap-3 justify-between">
                <p>
                  Kreirajte i organizujte raspored sedenja za vaše goste.
                  Dodajte stolove, rasporedite goste po mestima, po potrebi
                  izmenite raspored i izvezite ga kao PDF dokument spreman za
                  štampu.
                </p>
                <Button
                  variant="default"
                  className="cursor-pointer"
                  onClick={() => openModal("add_table")}
                >
                  Kreiraj Novi Sto
                </Button>
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <RasporedSedenja />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="finansije">
          <Card>
            <CardHeader>
              <CardTitle>Finansije</CardTitle>
              <CardDescription className="flex flex-row  gap-3 justify-between">
                <p>
                  Kreirajte i organizujte raspored sedenja za vaše goste.
                  Dodajte stolove, rasporedite goste po mestima, po potrebi
                  izmenite raspored i izvezite ga kao PDF dokument spreman za
                  štampu.
                </p>
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              {/* <RasporedSedenja /> */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <ModalContainer />
    </div>
  );
};
