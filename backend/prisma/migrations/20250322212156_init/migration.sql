-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('Pending', 'Accepted', 'Rejected');

-- CreateTable
CREATE TABLE "companies" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "address" TEXT,
    "gst_number" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transactions" (
    "id" SERIAL NOT NULL,
    "company_id" INTEGER NOT NULL,
    "source_country" TEXT NOT NULL,
    "source_state" TEXT NOT NULL,
    "dest_country" TEXT NOT NULL,
    "dest_state" TEXT NOT NULL,
    "actual_cost" DECIMAL(65,30) NOT NULL,
    "cost_with_tax" DECIMAL(65,30) NOT NULL,
    "real_cost_with_tax" DECIMAL(65,30),
    "transaction_date" TIMESTAMP(3) NOT NULL,
    "status" "TransactionStatus" DEFAULT 'Pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "companies_email_key" ON "companies"("email");

-- CreateIndex
CREATE UNIQUE INDEX "companies_gst_number_key" ON "companies"("gst_number");

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
