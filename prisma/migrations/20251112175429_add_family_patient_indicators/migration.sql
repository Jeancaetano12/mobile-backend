-- CreateTable
CREATE TABLE "Family" (
    "id" TEXT NOT NULL,
    "sobrenome" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "contatoTelefone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Family_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Patient" (
    "id" TEXT NOT NULL,
    "nomeCompleto" TEXT NOT NULL,
    "dataNascimento" TIMESTAMP(3) NOT NULL,
    "contatoTelefone" TEXT,
    "familiaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IndicadorSaude" (
    "id" TEXT NOT NULL,
    "dataRegistro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pesoKg" DOUBLE PRECISION,
    "pressaoArterial" TEXT,
    "glicemiaMgDl" INTEGER,
    "alturaM" DOUBLE PRECISION,
    "pacienteId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IndicadorSaude_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_familiaId_fkey" FOREIGN KEY ("familiaId") REFERENCES "Family"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndicadorSaude" ADD CONSTRAINT "IndicadorSaude_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;
