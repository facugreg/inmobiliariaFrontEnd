import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Search, ChevronLeft, ChevronRight } from "lucide-react"
import Header from '../components/Header';
import Footer from '../components/Footer';
import '@coreui/coreui/dist/css/coreui.min.css';
import {
  CContainer,
  CCarousel,
  CButton,
  CRow,
  CCol,
  CCarouselItem,
  CFormInput,
  CFormSelect,
  CInputGroup,
  CCard,
  CCardBody,
  CCardTitle,
  CCardText,
  CImage,
} from '@coreui/react';
//import Card from '../components/Card';

export default function RealEstatePage() {
  const properties = [
    {
      id: 1,
      image: "/modern-apartment-exterior.png",
      price: "$450,000",
      area: "85m²",
      description: "Moderno apartamento en zona céntrica con excelente ubicación",
      age: "5 años",
      address: "Av. Principal 123, Centro",
    },
    {
      id: 2,
      image: "/luxury-house-facade.png",
      price: "$750,000",
      area: "120m²",
      description: "Casa familiar con jardín y garage, ideal para familias",
      age: "2 años",
      address: "Calle Residencial 456, Zona Norte",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Search and Filters Section */}
      <section className="bg-muted py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Buscador" className="pl-10 bg-background" />
            </div>
            <div className="flex gap-2 flex-wrap">
              <CButton variant="outline" size="sm">
                Filtro 1
              </CButton>
              <CButton variant="outline" size="sm">
                Filtro 2
              </CButton>
              <CButton variant="outline" size="sm">
                Filtro 3
              </CButton>
              <CButton variant="outline" size="sm">
                Filtro 4
              </CButton>
            </div>
          </div>
        </div>
      </section>

      {/* Properties Listing */}
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {properties.map((property) => (
            <Card key={property.id} className="overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3">
                    <img
                      src={property.image || "/placeholder.svg"}
                      alt="Propiedad"
                      className="w-full h-48 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-2/3 p-6">
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="font-semibold text-lg text-primary">{property.price}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Metros²: </span>
                          <span className="font-medium">{property.area}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Antigüedad: </span>
                          <span className="font-medium">{property.age}</span>
                        </div>
                      </div>
                      <p className="text-foreground">{property.description}</p>
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium">Dirección: </span>
                        {property.address}
                      </p>
                      <Button className="w-full md:w-auto mt-4">Solicitar visita</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center space-x-2 mt-8">
          <Button variant="outline" size="sm">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="default" size="sm">
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <span className="text-muted-foreground">...</span>
          <Button variant="outline" size="sm">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </main>

     <Footer/>
    </div>
  )
}
