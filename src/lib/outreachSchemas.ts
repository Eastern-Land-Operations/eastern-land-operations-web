import { z } from 'zod'

const phoneMessage = 'Please enter a valid phone number'

const requiredString = (message: string) => z.string().trim().min(1, message)

export const sellerSituations = [
  'Repairs needed',
  'Inherited property',
  'Tired landlord',
  'Tax or lien issue',
  'Relocating',
  'Vacant property',
  'Code violation',
  'Just exploring options',
  'Other',
] as const

export const sellerPropertyTypes = [
  'Single-family',
  'Multifamily',
  'Land',
  'Mixed-use',
  'Commercial',
  'Other',
] as const

export const occupancyOptions = [
  'Occupied',
  'Vacant',
  'Tenant-occupied',
  'Unknown',
] as const

export const decisionTimelineOptions = [
  'ASAP',
  '30 days',
  '60–90 days',
  'Just exploring',
] as const

export const sellerOutcomeOptions = [
  'Highest price',
  'Fast closing',
  'As-is sale',
  'Flexible timeline',
  'Help understanding options',
  'Other',
] as const

export const contactMethodOptions = [
  'Phone',
  'Text',
  'Email',
] as const

export const buyerFundingOptions = [
  'Cash buyer',
  'Financed buyer',
  'Private lender backed',
  'Hard money buyer',
  'Other',
] as const

export const buyerPropertyTypes = [
  'Single-family',
  'Multifamily',
  'Mixed-use',
  'Land',
  'Commercial',
  'Rentals',
  'Flips',
  'Development',
  'Other',
] as const

export const buyerRoleOptions = [
  'Flip buyer',
  'Buy-and-hold buyer',
  'Landlord',
  'Developer',
  'Wholesaler/JV partner',
  'Other',
] as const

export const rehabToleranceOptions = [
  'Light cosmetic',
  'Moderate rehab',
  'Heavy rehab',
  'Shell / full gut',
  'Teardown',
  'Land only',
] as const

export const buyerAlertMethodOptions = [
  'Email',
  'Text',
  'Phone',
  'WhatsApp',
] as const

export const sellerFormSchema = z.object({
  submissionType: z.literal('property-owner'),
  fullName: requiredString('Full name is required'),
  phone: z.string().trim().min(10, phoneMessage),
  email: z.string().trim().email('Please enter a valid email'),
  propertyAddress: requiredString('Property address is required'),
  propertyOwnership: requiredString('Please let us know if you own the property'),
  otherDecisionMakers: requiredString('Please tell us whether other decision-makers are involved'),
  occupancyStatus: z.enum(occupancyOptions, { message: 'Please choose an occupancy status' }),
  propertyType: z.enum(sellerPropertyTypes, { message: 'Please choose a property type' }),
  situation: z.enum(sellerSituations, { message: 'Please choose the situation that fits best' }),
  knownRepairs: z.string().trim().optional(),
  timeline: z.enum(decisionTimelineOptions, { message: 'Please choose your timeline' }),
  desiredOutcome: z.enum(sellerOutcomeOptions, { message: 'Please choose the most helpful outcome' }),
  taxMortgageIssues: z.string().trim().optional(),
  preferredContact: z.enum(contactMethodOptions, { message: 'Please choose a preferred contact method' }),
  bestTimeToContact: z.string().trim().optional(),
  notes: z.string().trim().optional(),
  referralSource: z.string().trim().optional(),
  _hp: z.string().optional(),
})

export const buyerFormSchema = z.object({
  submissionType: z.literal('investor'),
  fullName: requiredString('Full name is required'),
  companyName: z.string().trim().optional(),
  phone: z.string().trim().min(10, phoneMessage),
  email: z.string().trim().email('Please enter a valid email'),
  fundingType: z.enum(buyerFundingOptions, { message: 'Please choose your buyer type' }),
  propertyTypesWanted: z.array(z.string()).min(1, 'Select at least one property type'),
  preferredAreas: requiredString('Preferred areas or zip codes are required'),
  typicalPurchasePriceRange: z.string().trim().optional(),
  maximumPurchasePrice: z.string().trim().optional(),
  minimumDesiredReturn: z.string().trim().optional(),
  buyerRole: z.enum(buyerRoleOptions, { message: 'Please choose your buyer role' }),
  rehabTolerance: z.enum(rehabToleranceOptions, { message: 'Please choose a rehab tolerance' }),
  closeSpeed: z.string().trim().optional(),
  purchasesLast12Months: z.string().trim().optional(),
  proofOfFundsAvailable: requiredString('Please tell us whether proof of funds is available'),
  preferredDealAlertMethod: z.enum(buyerAlertMethodOptions, { message: 'Please choose an alert method' }),
  vipAlerts: z.enum(['Yes', 'No']),
  notes: z.string().trim().optional(),
  referralSource: z.string().trim().optional(),
  _hp: z.string().optional(),
})

export const outreachSchema = z.discriminatedUnion('submissionType', [
  sellerFormSchema,
  buyerFormSchema,
  z.object({
    submissionType: z.enum([
      'agent',
      'wholesaler',
      'contractor',
      'investor',
      'lender',
      'housing-partner',
      'other',
    ]),
    fullName: z.string().min(2).max(100),
    email: z.string().email(),
    phone: z.string().min(10).max(20),
    preferredContact: z.string().optional(),
    propertyAddress: z.string().optional(),
    propertyCity: z.string().optional(),
    propertyState: z.string().optional(),
    propertyZip: z.string().optional(),
    propertyType: z.string().optional(),
    occupancyStatus: z.string().optional(),
    condition: z.string().optional(),
    knownRepairs: z.string().optional(),
    codeViolations: z.string().optional(),
    taxMortgageIssues: z.string().optional(),
    isListed: z.string().optional(),
    isUnderContract: z.string().optional(),
    foreclosureDate: z.string().optional(),
    desiredPrice: z.string().optional(),
    timeline: z.string().optional(),
    companyName: z.string().optional(),
    roleService: z.string().optional(),
    marketsServed: z.string().optional(),
    partnershipType: z.string().optional(),
    websiteLink: z.string().optional(),
    reasonForReaching: z.string().optional(),
    desiredOutcome: z.string().optional(),
    urgentInfo: z.string().optional(),
    referralSource: z.string().optional(),
    _hp: z.string().optional(),
  }),
])

export type SellerFormSubmission = z.infer<typeof sellerFormSchema>
export type BuyerFormSubmission = z.infer<typeof buyerFormSchema>
export type OutreachSubmission = z.infer<typeof outreachSchema>
