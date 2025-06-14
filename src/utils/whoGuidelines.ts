
export const whoPregnancyGuidelines = {
  preconception: [
    {
      category: "Folic Acid Supplementation",
      recommendation: "Take 400μg (0.4mg) of folic acid daily at least one month before conception",
      importance: "Prevents neural tube defects"
    },
    {
      category: "Vaccination",
      recommendation: "Ensure up-to-date vaccinations, especially rubella and varicella",
      importance: "Protects mother and baby from preventable diseases"
    },
    {
      category: "Nutrition",
      recommendation: "Maintain a balanced diet rich in fruits, vegetables, and whole grains",
      importance: "Supports optimal fertility and early pregnancy health"
    },
    {
      category: "Lifestyle",
      recommendation: "Avoid alcohol, tobacco, and recreational drugs",
      importance: "Reduces risk of birth defects and pregnancy complications"
    },
    {
      category: "Medical Conditions",
      recommendation: "Manage chronic conditions like diabetes and hypertension",
      importance: "Optimizes pregnancy outcomes"
    }
  ],
  pregnancy: [
    {
      trimester: 1,
      weeks: "1-12",
      recommendations: [
        {
          category: "Folic Acid",
          guidance: "Continue 400μg daily throughout first trimester",
          frequency: "Daily"
        },
        {
          category: "Prenatal Vitamins",
          guidance: "Start comprehensive prenatal vitamin with iron",
          frequency: "Daily"
        },
        {
          category: "Lifestyle",
          guidance: "Avoid alcohol, tobacco, raw fish, and high-mercury fish",
          frequency: "Ongoing"
        },
        {
          category: "Exercise",
          guidance: "Moderate exercise 150 minutes per week if no complications",
          frequency: "Regular"
        }
      ],
      checkups: [
        {
          type: "Initial Visit",
          timing: "8-10 weeks",
          urgent: false,
          description: "Comprehensive health assessment and pregnancy confirmation",
          tests: ["Blood pressure", "Weight", "Urine test", "Blood tests", "Dating ultrasound"]
        },
        {
          type: "Follow-up",
          timing: "12 weeks",
          urgent: false,
          description: "Monitor early pregnancy progress",
          tests: ["Blood pressure", "Weight", "Fetal heart rate", "Genetic screening"]
        }
      ]
    },
    {
      trimester: 2,
      weeks: "13-27",
      recommendations: [
        {
          category: "Iron Supplementation",
          guidance: "30-60mg elemental iron daily if not anemic",
          frequency: "Daily"
        },
        {
          category: "Calcium",
          guidance: "1200mg daily from diet or supplements",
          frequency: "Daily"
        },
        {
          category: "Physical Activity",
          guidance: "Continue moderate exercise, avoid contact sports",
          frequency: "Regular"
        },
        {
          category: "Dental Care",
          guidance: "Maintain good oral hygiene, safe to have dental treatment",
          frequency: "Ongoing"
        }
      ],
      checkups: [
        {
          type: "Routine Visit",
          timing: "16 weeks",
          urgent: false,
          description: "Monitor maternal and fetal wellbeing",
          tests: ["Blood pressure", "Weight", "Fetal heart rate", "Fundal height"]
        },
        {
          type: "Anatomy Scan",
          timing: "18-22 weeks",
          urgent: true,
          description: "Detailed fetal anatomy assessment",
          tests: ["Ultrasound", "Fetal measurements", "Organ development", "Placenta position"]
        },
        {
          type: "Routine Visit",
          timing: "24-26 weeks",
          urgent: false,
          description: "Continue monitoring progress",
          tests: ["Blood pressure", "Weight", "Glucose screening", "Fetal heart rate"]
        }
      ]
    },
    {
      trimester: 3,
      weeks: "28-40",
      recommendations: [
        {
          category: "Iron Monitoring",
          guidance: "Continue iron supplementation, monitor for anemia",
          frequency: "Daily"
        },
        {
          category: "Kick Counts",
          guidance: "Monitor fetal movements daily from 28 weeks",
          frequency: "Daily"
        },
        {
          category: "Birth Preparation",
          guidance: "Attend childbirth education classes",
          frequency: "Weekly"
        },
        {
          category: "Nutrition",
          guidance: "Increase caloric intake by 300-500 calories",
          frequency: "Daily"
        }
      ],
      checkups: [
        {
          type: "Routine Visit",
          timing: "28 weeks",
          urgent: false,
          description: "Third trimester assessment",
          tests: ["Blood pressure", "Weight", "Fetal heart rate", "Anti-D if Rh negative"]
        },
        {
          type: "Growth Scan",
          timing: "32 weeks",
          urgent: false,
          description: "Monitor fetal growth and position",
          tests: ["Ultrasound", "Estimated fetal weight", "Amniotic fluid", "Placenta function"]
        },
        {
          type: "Weekly Visits",
          timing: "36+ weeks",
          urgent: true,
          description: "Close monitoring before delivery",
          tests: ["Blood pressure", "Weight", "Cervical assessment", "Fetal monitoring"]
        }
      ]
    }
  ],
  postpartum: [
    {
      category: "Breastfeeding",
      recommendation: "Exclusive breastfeeding for first 6 months",
      timing: "0-6 months"
    },
    {
      category: "Contraception",
      recommendation: "Discuss family planning options before discharge",
      timing: "Before discharge"
    },
    {
      category: "Mental Health",
      recommendation: "Screen for postpartum depression at every visit",
      timing: "Ongoing"
    }
  ]
};
