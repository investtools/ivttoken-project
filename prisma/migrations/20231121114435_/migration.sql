-- CreateTable
CREATE TABLE "GigaSchools" (
    "internalUuid" TEXT NOT NULL,
    "id" INTEGER NOT NULL,
    "school_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lon" DOUBLE PRECISION NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "address" TEXT NOT NULL,
    "postal_code" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "education_level" TEXT NOT NULL,
    "environment" TEXT NOT NULL,
    "school_type" TEXT NOT NULL,
    "country_id" INTEGER NOT NULL,
    "code" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "location_id" TEXT NOT NULL,
    "admin_2_name" TEXT NOT NULL,
    "admin_3_name" TEXT NOT NULL,
    "admin_4_name" TEXT NOT NULL,
    "admin_1_name" TEXT NOT NULL,
    "giga_id_school" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GigaSchools_pkey" PRIMARY KEY ("internalUuid")
);
