"use client";

import { useState, useEffect } from "react";
import HeroSearch from "@/components/home/HeroSearch";
import HomePhlebotomyBanner from "@/components/home/HomePhlebotomyBanner";
import TestDirectory from "@/components/catalog/TestDirectory";
import PrescriptionCard from "@/components/prescription/PrescriptionCard";
import BookingModal, { BookingItem } from "@/components/booking/BookingModal";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingItems, setBookingItems] = useState<BookingItem[]>([]);
  const [initialVisitType, setInitialVisitType] = useState<"WALK_IN" | "HOME_SAMPLE">("WALK_IN");

  useEffect(() => {
    const handleOpenBooking = () => {
      setInitialVisitType("WALK_IN");
      setIsBookingOpen(true);
    };
    window.addEventListener("open-booking-modal", handleOpenBooking);
    return () => window.removeEventListener("open-booking-modal", handleOpenBooking);
  }, []);

  const handleToggleItem = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleProceed = (items: BookingItem[]) => {
    setBookingItems(items);
    setInitialVisitType("WALK_IN");
    setIsBookingOpen(true);
  };

  const handleBookHomeVisit = () => {
    setInitialVisitType("HOME_SAMPLE");
    setIsBookingOpen(true);
  };

  const handleRemoveBookingItem = (id: string) => {
    setSelectedIds((prev) => prev.filter((i) => i !== id));
    setBookingItems((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <main className="min-h-screen bg-sullimax-canvas pb-24">
      {/* 1. Hero & Search */}
      <HeroSearch
        onSearch={(query) => setSearchQuery(query)}
        activeCategory={activeCategory}
        onSelectCategory={(cat) => setActiveCategory(cat)}
      />

      {/* 2. Prominent Home Phlebotomy Banner */}
      <HomePhlebotomyBanner onBookHomeVisit={handleBookHomeVisit} />

      {/* 3. Catalog Directory */}
      <TestDirectory
        searchQuery={searchQuery}
        categoryFilter={activeCategory}
        selectedItemIds={selectedIds}
        onToggleItem={handleToggleItem}
        onProceedToBooking={handleProceed}
      />

      {/* 4. Prescription Upload */}
      <PrescriptionCard />

      {/* 5. Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        selectedItems={bookingItems}
        onRemoveItem={handleRemoveBookingItem}
        initialVisitType={initialVisitType}
      />
    </main>
  );
}