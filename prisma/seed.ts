import { PrismaClient, SampleType, TargetGender } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Sullimax Diagnostics database...');

  await prisma.clinicProfile.upsert({
    where: { id: 'sullimax-headquarters' },
    update: {},
    create: {
      id: 'sullimax-headquarters',
      name: 'Sullimax Diagnostics Centre Ltd',
      rcNumber: 'RC 1196599',
      address: '6, Olumo Street, Onike, By Onike Roundabout, Yaba, Lagos',
      phoneNumbers: ['07067582117', '08036693403', '08184016398'],
      mission: 'To Provide Reliable, Timely, Informative And Quality Medical Diagnostic Services For The Benefit Of The Patient',
      vision: 'To Be A Premier Health Care Provider In Every Community And Region That We Serve',
    },
  });

  const tests = [
    { code: 'FBC', name: 'Full Blood Count (FBC)', category: 'Haematology', price: 7000, sampleType: SampleType.BLOOD, preparation: 'No fasting required. Maintain normal hydration.', turnaroundTime: '2–4 hours', isPopular: true },
    { code: 'ESR', name: 'Erythrocyte Sedimentation Rate (ESR)', category: 'Haematology', price: 5000, sampleType: SampleType.BLOOD, preparation: 'No special preparation required.', turnaroundTime: '2 hours', isPopular: false },
    { code: 'GENO_BG', name: 'Blood Group & Genotype Screening', category: 'Haematology', price: 8000, sampleType: SampleType.BLOOD, preparation: 'No special preparation required.', turnaroundTime: '2–3 hours', isPopular: true },
    { code: 'MP', name: 'Malaria Parasite (Microscopy)', category: 'Parasitology', price: 3000, sampleType: SampleType.BLOOD, preparation: 'No special preparation required.', turnaroundTime: '1 hour', isPopular: true },
    { code: 'WIDAL', name: 'Widal Reaction (Typhoid)', category: 'Serology', price: 4000, sampleType: SampleType.BLOOD, preparation: 'No special preparation required.', turnaroundTime: '1–2 hours', isPopular: true },
    { code: 'HIV_1_2', name: 'HIV I & II Screening', category: 'Serology', price: 5000, sampleType: SampleType.BLOOD, preparation: 'Confidential pre-test counseling provided.', turnaroundTime: 'Same Day (2 hours)', isPopular: true },
    { code: 'HEP_B', name: 'Hepatitis B Surface Antigen (HBsAg)', category: 'Serology', price: 5000, sampleType: SampleType.BLOOD, preparation: 'No special preparation required.', turnaroundTime: 'Same Day (2 hours)', isPopular: true },
    { code: 'HEP_C', name: 'Hepatitis C Antibody Screening (HCV)', category: 'Serology', price: 5000, sampleType: SampleType.BLOOD, preparation: 'No special preparation required.', turnaroundTime: 'Same Day (2 hours)', isPopular: true },
    { code: 'HEP_A', name: 'Hepatitis A Screening', category: 'Serology', price: 6000, sampleType: SampleType.BLOOD, preparation: 'No special preparation required.', turnaroundTime: 'Same Day', isPopular: false },
    { code: 'VDRL', name: 'VDRL (Syphilis Screening)', category: 'Serology', price: 5000, sampleType: SampleType.BLOOD, preparation: 'No special preparation required.', turnaroundTime: 'Same Day (2 hours)', isPopular: true },
    { code: 'H_PYLORI', name: 'Helicobacter Pylori (H. Pylori)', category: 'Serology', price: 5000, sampleType: SampleType.BLOOD, preparation: 'Avoid antibiotics or antacids for 48 hours prior if advised.', turnaroundTime: 'Same Day (2 hours)', isPopular: true },
    { code: 'SERUM_TB', name: 'Serum Tuberculosis (TB) Antibody', category: 'Serology', price: 5000, sampleType: SampleType.BLOOD, preparation: 'No special preparation required.', turnaroundTime: 'Same Day', isPopular: false },
    { code: 'GONORRHEA', name: 'Gonorrhea Antigen Screening', category: 'Sexual Health', price: 5000, sampleType: SampleType.SWAB, preparation: 'Avoid urinating for 1 hour prior to specimen collection.', turnaroundTime: '24 hours', isPopular: false },
    { code: 'CHLAMYDIA', name: 'Chlamydia Antigen Screening', category: 'Sexual Health', price: 5000, sampleType: SampleType.SWAB, preparation: 'Avoid urinating for 1 hour prior to specimen collection.', turnaroundTime: '24 hours', isPopular: false },
    { code: 'HERPES', name: 'Herpes Simplex Virus (HSV) Panel', category: 'Sexual Health', price: 45000, sampleType: SampleType.BLOOD, preparation: 'No special preparation required.', turnaroundTime: '24–48 hours', isPopular: false },
    { code: 'HPV_SCREEN', name: 'HPV Screening', category: 'Sexual Health', price: 25000, sampleType: SampleType.SWAB, preparation: 'Avoid intercourse and vaginal medications 48 hours prior.', turnaroundTime: '3–5 working days', isPopular: false },
    { code: 'FBS_RBS', name: 'Fasting Blood Sugar / Random Blood Sugar', category: 'Clinical Chemistry', price: 3000, sampleType: SampleType.BLOOD, preparation: 'Fasting: 8–10 hours overnight fasting. Random: No prep.', turnaroundTime: '1 hour', isPopular: true },
    { code: 'LIPID_PROFILE', name: 'Lipid Profile (Cholesterol, Triglycerides, HDL, LDL, VLDL)', category: 'Clinical Chemistry', price: 12000, sampleType: SampleType.BLOOD, preparation: 'Strict 10–12 hours overnight fasting required.', turnaroundTime: '4 hours', isPopular: true },
    { code: 'CHOLESTEROL', name: 'Total Cholesterol (Standalone)', category: 'Clinical Chemistry', price: 4000, sampleType: SampleType.BLOOD, preparation: '10–12 hours fasting recommended.', turnaroundTime: '2 hours', isPopular: false },
    { code: 'TRIGLYCERIDES', name: 'Triglycerides (Standalone)', category: 'Clinical Chemistry', price: 4000, sampleType: SampleType.BLOOD, preparation: '10–12 hours fasting recommended.', turnaroundTime: '2 hours', isPopular: false },
    { code: 'KIDNEY_ELECTROLYTES', name: 'Full Electrolyte & Renal Panel', category: 'Clinical Chemistry', price: 12000, sampleType: SampleType.BLOOD, preparation: 'Maintain normal hydration; avoid strenuous exercise.', turnaroundTime: '4 hours', isPopular: true },
    { code: 'UREA', name: 'Urea (Standalone)', category: 'Clinical Chemistry', price: 4000, sampleType: SampleType.BLOOD, preparation: 'No special preparation.', turnaroundTime: '2 hours', isPopular: false },
    { code: 'CREATININE', name: 'Creatinine (Standalone)', category: 'Clinical Chemistry', price: 4000, sampleType: SampleType.BLOOD, preparation: 'Avoid heavy red meat consumption 24 hours prior.', turnaroundTime: '2 hours', isPopular: false },
    { code: 'LFT_FULL', name: 'Liver Function Test (LFT Panel)', category: 'Clinical Chemistry', price: 12000, sampleType: SampleType.BLOOD, preparation: 'Avoid alcohol consumption for 24 hours prior.', turnaroundTime: '4 hours', isPopular: true },
    { code: 'ALCOHOL_SCREEN', name: 'Alcohol Screening', category: 'Toxicology', price: 10000, sampleType: SampleType.BLOOD, preparation: 'Direct collection under Chain of Custody.', turnaroundTime: 'Same Day', isPopular: false },
    { code: 'URINALYSIS', name: 'Urinalysis (Dipstick & Microscopy)', category: 'Microbiology', price: 3000, sampleType: SampleType.URINE, preparation: 'Collect clean-catch midstream urine specimen.', turnaroundTime: '1 hour', isPopular: true },
    { code: 'URINE_MCS', name: 'Urine Microscopy, Culture & Sensitivity (MCS)', category: 'Microbiology', price: 7000, sampleType: SampleType.URINE, preparation: 'Clean-catch midstream urine in a sterile container.', turnaroundTime: '48–72 hours', isPopular: true },
    { code: 'URINE_MCS_URINALYSIS', name: 'Urine MCS & Urinalysis Bundle', category: 'Microbiology', price: 10000, sampleType: SampleType.URINE, preparation: 'Clean-catch midstream morning sample.', turnaroundTime: '48–72 hours', isPopular: false },
    { code: 'STOOL_ANALYSIS', name: 'Routine Stool Analysis', category: 'Microbiology', price: 3000, sampleType: SampleType.STOOL, preparation: 'Collect fresh stool sample in a sterile container.', turnaroundTime: '2 hours', isPopular: false },
    { code: 'STOOL_MCS', name: 'Stool Microscopy, Culture & Sensitivity (MCS)', category: 'Microbiology', price: 7000, sampleType: SampleType.STOOL, preparation: 'Collect fresh sample; avoid contamination.', turnaroundTime: '48–72 hours', isPopular: false },
    { code: 'HVS_MCS', name: 'High Vaginal Swab (HVS) M/C/S', category: 'Microbiology', price: 8000, sampleType: SampleType.SWAB, preparation: 'Avoid douching and sexual intercourse 24–48 hours prior.', turnaroundTime: '48–72 hours', isPopular: true },
    { code: 'URETHRAL_MCS', name: 'Urethral Swab M/C/S', category: 'Microbiology', price: 8000, sampleType: SampleType.SWAB, preparation: 'Do not urinate for at least 2 hours before sample collection.', turnaroundTime: '48–72 hours', isPopular: false },
    { code: 'HORMONAL_ASSAY_F', name: 'Female Hormonal Assay', category: 'Endocrinology', price: 48000, sampleType: SampleType.BLOOD, preparation: 'Best taken on Day 2 or Day 3 of menstrual cycle.', turnaroundTime: '24–48 hours', isPopular: true },
    { code: 'HORMONAL_ASSAY_M', name: 'Male Hormonal Assay', category: 'Endocrinology', price: 36000, sampleType: SampleType.BLOOD, preparation: 'Morning blood sample recommended (8:00 AM – 10:00 AM).', turnaroundTime: '24–48 hours', isPopular: false },
    { code: 'AMH', name: 'Anti-Müllerian Hormone (AMH)', category: 'Endocrinology', price: 25000, sampleType: SampleType.BLOOD, preparation: 'Can be collected at any phase of the menstrual cycle.', turnaroundTime: '24–48 hours', isPopular: false },
    { code: 'SEMEN_ANALYSIS', name: 'Seminal Fluid Analysis (SFA M/C/S)', category: 'Fertility & Andrology', price: 12000, sampleType: SampleType.SEMEN, preparation: 'Strict sexual abstinence for 3 to 5 days prior to collection.', turnaroundTime: '24 hours', isPopular: true },
    { code: 'BLOOD_PT', name: 'Blood Pregnancy Test (Serum beta-hCG)', category: 'Serology', price: 3000, sampleType: SampleType.BLOOD, preparation: 'No special preparation required.', turnaroundTime: '1 hour', isPopular: true },
    { code: 'PSA_QUANTITATIVE', name: 'Prostate Screening (Quantitative PSA)', category: 'Oncology', price: 12000, sampleType: SampleType.BLOOD, preparation: 'Avoid ejaculation and bicycle riding 48 hours prior.', turnaroundTime: 'Same Day (4 hours)', isPopular: true },
    { code: 'PAP_SMEAR', name: 'Pap Smear Cervical Cytology', category: 'Oncology & Cytology', price: 25000, sampleType: SampleType.SWAB, preparation: 'Schedule when not menstruating; avoid intercourse 48 hrs prior.', turnaroundTime: '3–5 working days', isPopular: true },
    { code: 'ABDOMINAL_SCAN', name: 'Abdominal Ultrasound Scan', category: 'Radiology & Ultrasound', price: 10000, sampleType: SampleType.IMAGING, preparation: 'Fast for 6 hours; drink 1 liter of water 1 hr prior.', turnaroundTime: 'Instant Result + Medical Report', isPopular: true },
    { code: 'PELVIC_SCAN', name: 'Pelvic Ultrasound Scan', category: 'Radiology & Ultrasound', price: 5000, sampleType: SampleType.IMAGING, preparation: 'Drink 3–4 glasses of water 1 hour before test (full bladder).', turnaroundTime: 'Instant Result + Medical Report', isPopular: true },
    { code: 'ECG', name: 'Electrocardiography (ECG) Pre & Post Exercise', category: 'Cardiology', price: 12000, sampleType: SampleType.CARDIAC_WAVEFORM, preparation: 'Wear loose clothing; avoid caffeine before the test.', turnaroundTime: 'Same Day Specialist Review', isPopular: true },
  ];

  for (const test of tests) {
    await prisma.testCatalog.upsert({ where: { code: test.code }, update: test, create: test });
  }

  const packages = [
    { slug: 'total-body-platinum-female', title: 'Total Body Checkup (Platinum Package - Female)', category: 'Total Body Checkup', targetGender: TargetGender.FEMALE, price: 163000, discountPrice: 160000, description: 'Comprehensive 20-test executive health screen for women including Pap Smear, Abdominal Scan, ECG, Full Electrolytes, LFT, and Serology.', isPopular: true },
    { slug: 'total-body-platinum-male', title: 'Total Body Checkup (Platinum Package - Male)', category: 'Total Body Checkup', targetGender: TargetGender.MALE, price: 150000, discountPrice: 147000, description: 'Comprehensive 20-test executive health screen for men including Quantitative Prostate PSA, Abdominal Scan, ECG, Full Electrolytes, and LFT.', isPopular: true },
    { slug: 'total-body-gold', title: 'Total Body Checkup (Gold Package)', category: 'Total Body Checkup', targetGender: TargetGender.UNISEX, price: 88000, discountPrice: 86000, description: 'Complete 15-test vital organ evaluation including Abdominal Scan, LFT, Renal indicators, Lipid screen, and Viral Hepatitis markers.', isPopular: true },
    { slug: 'total-body-silver', title: 'Total Body Checkup (Silver Package)', category: 'Total Body Checkup', targetGender: TargetGender.UNISEX, price: 39000, discountPrice: 38000, description: 'Essential 9-test wellness screen covering FBC, Urinalysis, Malaria, Typhoid, HIV, Hepatitis B & C, Cholesterol, and Fasting Sugar.', isPopular: false },
    { slug: 'fertility-package-female', title: 'Fertility Screening Package (Female)', category: 'Fertility', targetGender: TargetGender.FEMALE, price: 93000, discountPrice: 92000, description: 'Specialized fertility evaluation: Full Female Hormonal Assay, Anti-Müllerian Hormone (AMH), Pelvic Scan, Urine MCS, and HVS MCS.', isPopular: false },
    { slug: 'fertility-package-male', title: 'Fertility Screening Package (Male)', category: 'Fertility', targetGender: TargetGender.MALE, price: 63000, discountPrice: 62000, description: 'Specialized male fertility evaluation: Male Hormonal Assay, Seminal Fluid Analysis (SFA MCS), Urethral Swab, and Urine MCS.', isPopular: false },
    { slug: 'std-alpha-female', title: 'Sexual Health Alpha Package (Female)', category: 'Sexual Health', targetGender: TargetGender.FEMALE, price: 123000, discountPrice: 121000, description: 'Comprehensive 11-panel STI investigation: Herpes, HPV, Chlamydia, Gonorrhea, HIV, Hepatitis B & C, VDRL, HVS MCS, and Pelvic Scan.', isPopular: false },
    { slug: 'std-alpha-male', title: 'Sexual Health Alpha Package (Male)', category: 'Sexual Health', targetGender: TargetGender.MALE, price: 118000, discountPrice: 117000, description: 'Comprehensive 11-panel STI investigation: Herpes, HPV, Chlamydia, Gonorrhea, HIV, Hepatitis B & C, VDRL, Urethral MCS, and Urine MCS.', isPopular: false },
    { slug: 'std-beta-female', title: 'Sexual Health Beta Package (Female)', category: 'Sexual Health', targetGender: TargetGender.FEMALE, price: 48000, discountPrice: 47000, description: 'Focused STI screen: Chlamydia, HIV, Hepatitis B & C, VDRL, Urinalysis, Urine MCS, HVS MCS, and Pelvic Scan.', isPopular: false },
    { slug: 'std-beta-male', title: 'Sexual Health Beta Package (Male)', category: 'Sexual Health', targetGender: TargetGender.MALE, price: 43000, discountPrice: 42000, description: 'Focused STI screen: Chlamydia, HIV, Hepatitis B & C, VDRL, Urinalysis, Urine MCS, and Urethral MCS.', isPopular: false },
    { slug: 'std-delta', title: 'Sexual Health Delta Package', category: 'Sexual Health', targetGender: TargetGender.UNISEX, price: 38000, discountPrice: 37000, description: 'Standard sexual wellness screening: Hepatitis B & C, HIV, VDRL (Syphilis), Urinalysis, Urine MCS, and Swab MCS.', isPopular: false },
    { slug: 'nanny-package-female', title: 'Domestic Staff / Nanny Package (Female)', category: 'Domestic Staff', targetGender: TargetGender.FEMALE, price: 27000, discountPrice: 27000, description: 'Essential screening for domestic staff: HIV I & II, Hepatitis B & C, Blood Pregnancy Test, Typhoid Widal, and Serum TB.', isPopular: false },
    { slug: 'nanny-package-male', title: 'Domestic Staff / Nanny Package (Male)', category: 'Domestic Staff', targetGender: TargetGender.MALE, price: 24000, discountPrice: 24000, description: 'Essential screening for domestic staff: HIV I & II, Hepatitis B & C, Typhoid Widal, and Serum TB.', isPopular: false },
    { slug: 'food-handler-1-female', title: 'Food Handler Certification Test I (Female)', category: 'Corporate Screening', targetGender: TargetGender.FEMALE, price: 54000, discountPrice: 54000, description: 'Complete corporate catering clearance: Hepatitis A, B & C, Serum TB, HIV, VDRL, Typhoid, Pregnancy, Stool, Urine, and Alcohol Screen.', isPopular: false },
    { slug: 'food-handler-1-male', title: 'Food Handler Certification Test I (Male)', category: 'Corporate Screening', targetGender: TargetGender.MALE, price: 51000, discountPrice: 51000, description: 'Complete corporate catering clearance: Hepatitis A, B & C, Serum TB, HIV, VDRL, Typhoid, Stool, Urine, and Alcohol Screen.', isPopular: false },
    { slug: 'food-handler-2-female', title: 'Food Handler Test II (Female)', category: 'Corporate Screening', targetGender: TargetGender.FEMALE, price: 28000, discountPrice: 28000, description: 'Basic food handler health screen: HIV, Serum TB, Hepatitis B & C, Typhoid, and Blood Pregnancy Test.', isPopular: false },
    { slug: 'food-handler-2-male', title: 'Food Handler Test II (Male)', category: 'Corporate Screening', targetGender: TargetGender.MALE, price: 23000, discountPrice: 23000, description: 'Basic food handler health screen: HIV, Serum TB, Hepatitis B & C, and Typhoid.', isPopular: false },
    { slug: 'pre-marital-platinum-female', title: 'Pre-Marital Platinum Package (Female)', category: 'Pre-Marital', targetGender: TargetGender.FEMALE, price: 116000, discountPrice: 116000, description: 'Advanced marital compatibility screen: Genotype, Blood Group, HIV, Hepatitis B & C, Pregnancy, VDRL, Swabs, Herpes, and HPV Screening.', isPopular: false },
    { slug: 'pre-marital-platinum-male', title: 'Pre-Marital Platinum Package (Male)', category: 'Pre-Marital', targetGender: TargetGender.MALE, price: 125000, discountPrice: 125000, description: 'Advanced marital compatibility screen: Genotype, Blood Group, HIV, Hepatitis B & C, VDRL, Semen Analysis, Herpes, and HPV Screening.', isPopular: false },
    { slug: 'pre-marital-gold-female', title: 'Pre-Marital Gold Package (Female)', category: 'Pre-Marital', targetGender: TargetGender.FEMALE, price: 46000, discountPrice: 46000, description: 'Comprehensive pre-marital screen: Genotype, Blood Group, HIV, Hepatitis B & C, Pregnancy, VDRL, Urine MCS, and HVS MCS.', isPopular: false },
    { slug: 'pre-marital-gold-male', title: 'Pre-Marital Gold Package (Male)', category: 'Pre-Marital', targetGender: TargetGender.MALE, price: 54000, discountPrice: 54000, description: 'Comprehensive pre-marital screen: Genotype, Blood Group, HIV, Hepatitis B & C, VDRL, Urine MCS, Urethral MCS, and Semen Analysis.', isPopular: false },
    { slug: 'pre-marital-silver-female', title: 'Pre-Marital Silver Package (Female)', category: 'Pre-Marital', targetGender: TargetGender.FEMALE, price: 31000, discountPrice: 31000, description: 'Essential pre-marital profile: Blood Group & Genotype, HIV I & II, Hepatitis B & C, Blood Pregnancy Test, and VDRL.', isPopular: false },
    { slug: 'pre-marital-silver-male', title: 'Pre-Marital Silver Package (Male)', category: 'Pre-Marital', targetGender: TargetGender.MALE, price: 28000, discountPrice: 28000, description: 'Essential pre-marital profile: Blood Group & Genotype, HIV I & II, Hepatitis B & C, and VDRL.', isPopular: false },
  ];

  for (const pkg of packages) {
    await prisma.healthPackage.upsert({ where: { slug: pkg.slug }, update: pkg, create: pkg });
  }

  console.log(`Seed complete: Loaded clinic profile, ${tests.length} tests, and ${packages.length} packages.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });