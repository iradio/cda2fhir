{
    templateId: '/ClinicalDocument/templateId/@root',
    title: '/ClinicalDocument/title/text()',
    effectiveTime: '/ClinicalDocument/effectiveTime/@value',
    confidentialityCode: '/ClinicalDocument/confidentialityCode/@code',
    id: '/ClinicalDocument/id/@extension',
    setId: '/ClinicalDocument/setId/@extension',
    versionNumber: '/ClinicalDocument/versionNumber/@value',
    patient: {
        patientId: '//patientRole/id[1]/@extension',
        patientSNILS: '//patientRole/id[2]/@extension',
        patientCardType: '//patientRole/identity:IdentityDoc/identity:IdentityCardType/@code',
        patientCardSeries: '//patientRole/identity:IdentityDoc/identity:Series/text()',
        patientCardNumber: '//patientRole/identity:IdentityDoc/identity:Number/text()',
        patientCardIssueOrgName: '//patientRole/identity:IdentityDoc/identity:IssueOrgName/text()',
        patientCardIssueOrgCode: '//patientRole/identity:IdentityDoc/identity:IssueOrgCode/text()',
        patientCardIssueDate: '//patientRole/identity:IdentityDoc/identity:IssueDate/@value',
        patientFamily: '//patientRole/patient/name/family/text()',
        patientName: '//patientRole/patient/name/given/text()',
        patientPatronymic: '//patientRole/patient/name/identity:Patronymic/text()',
        patientGender: '//patientRole/patient/administrativeGenderCode/@code',
        patientBirthday: '//patientRole/patient/birthTime/@value',
        patientAddress: [
            '//patientRole/addr', {
                addressType: 'address:Type/@code',
                addressText: 'streetAddressLine/text()',
                addressStateCode: 'address:stateCode/@code',
                addressResidentCode: 'address:residentCode/@code',
                addressPostalCode: 'postalCode/text()',
                addressAOGUID: 'fias:Address/fias:AOGUID/text()',
                addressHOUSEGUID: 'fias:Address/fias:HOUSEGUID/text()'
            }
        ]
    },
    guardian: {
        guardianSNILS: '//guardian/id/@extension',
        guardianCardType: '//guardian/identity:IdentityDoc/identity:IdentityCardType/@code',
        guardianCardSeries: '//guardian/identity:IdentityDoc/identity:Series/text()',
        guardianCardNumber: '//guardian/identity:IdentityDoc/identity:Number/text()',
        guardianCardIssueOrgName: '//guardian/identity:IdentityDoc/identity:IssueOrgName/text()',
        guardianCardIssueOrgCode: '//guardian/identity:IdentityDoc/identity:IssueOrgCode/text()',
        guardianCardIssueDate: '//guardian/identity:IdentityDoc/identity:IssueDate/@value',
        guardianAuthorityDocType: '//guardian/identity:AuthorityDoc/identity:IdentityCardType/@code',
        guardianAuthorityDocSeries: '//guardian/identity:AuthorityDoc/identity:Series/text()',
        guardianAuthorityDocNumber: '//guardian/identity:AuthorityDoc/identity:Number/text()',
        guardianAuthorityDocIssueOrgName: '//guardian/identity:AuthorityDoc/identity:IssueOrgName/text()',
        guardianAuthorityDocIssueDate: '//guardian/identity:AuthorityDoc/identity:IssueDate/@value',
        guardianRelationshipType: '//guardian/code/@code',
        guardianAddressText: '//guardian/addr/streetAddressLine/text()',
        guardianStateCode: '//guardian/addr/address:stateCode/@code',
        guardianPostalCode: '//guardian/addr/postalCode/text()',
        guardianAOGUID: '//guardian/addr/fias:Address/fias:AOGUID/text()',
        guardianHOUSEGUID: '//guardian/addr/fias:Address/fias:HOUSEGUID/text()',
        guardianFamily: '//guardian/guardianPerson/name/family/text()',
        guardianName: '//guardian/guardianPerson/name/given/text()',
        guardianPatronymic: '//guardian/guardianPerson/name/identity:Patronymic/text()'
    },
    guardianOrg: {
        guardianOrgId: '//guardianOrganization/id/@root',
        guardianOrgUnitId: '//guardianOrganization/id/@extension',
        guardianOrgOGRN: '//guardianOrganization/identity:Props/identity:Ogrn/text()',
        guardianOrgOGRNIP: '//guardianOrganization/identity:Props/identity:Ogrnip/text()',
        guardianOrgOKPO: '//guardianOrganization/identity:Props/identity:Okpo/text()',
        guardianOrgOKATO: '//guardian/guardianOrganization/identity:Props/identity:Okato/text()',
        guardianOrgName: '//guardianOrganization/name/text()',
        guardianOrgAddressText: '//guardianOrganization/addr/streetAddressLine/text()',
        guardianOrgStateCode: '//guardianOrganization/addr/address:stateCode/@code',
        guardianOrgPostalCode: '//guardianOrganization/addr/postalCode/text()',
        guardianOrgAOGUID: '//guardianOrganization/addr/fias:Address/fias:AOGUID/text()',
        guardianOrgHOUSEGUID: '//guardianOrganization/addr/fias:Address/fias:HOUSEGUID/text()'
    },
    providerOrganization: {
        providerOrganization_Id: '//providerOrganization/id[1]/@root',
        providerOrganization_UnitId: '//providerOrganization/id[1]/@extension',
        providerOrganization_Name: '//providerOrganization/name/text()',
        providerOrganization_LicenseNumber: '//providerOrganization/id[2]/@extension',
        providerOrganization_LicenseAuthorityInfo: '//providerOrganization/id[2]/@assigningAuthorityName'
    },
    author: {
        authorId: '//assignedAuthor/id[1]/@extension',
        authorSNILS: '//assignedAuthor/id[2]/@extension',
        authorCode: '//assignedAuthor/code/@code',
        authorFamily: '//assignedAuthor/assignedPerson/name/family/text()',
        authorName: '//assignedAuthor/assignedPerson/name/given/text()',
        authorPatronymic: '//assignedAuthor/assignedPerson/name/identity:Patronymic/text()'
    },
    legalAuth: {
        legalAuthId: '//legalAuthenticator/assignedEntity/id[1]/@extension',
        legalAuthSNILS: '//legalAuthenticator/assignedEntity/id[2]/@extension',
        legalAuthCode: '//legalAuthenticator/assignedEntity/code/@code',
        legalAuthFamily: '//legalAuthenticator/assignedEntity/assignedPerson/name/family/text()',
        legalAuthName: '//legalAuthenticator/assignedEntity/assignedPerson/name/given/text()',
        legalAuthPatronymic: '//legalAuthenticator/assignedEntity/assignedPerson/name/identity:Patronymic/text()'
    },
    payment: {
        paymentType: '//participant[@typeCode="IND"]/associatedEntity/code/@code',
        paymentDocType: '//participant[@typeCode="IND"]/associatedEntity/identity:DocInfo/identity:IdentityDocType/@code',
        paymentPolicyType: '//participant[@typeCode="IND"]/associatedEntity/identity:DocInfo/identity:InsurancePolicyType/@code',
        paymentDocSeries: '//participant[@typeCode="IND"]/associatedEntity/identity:DocInfo/identity:Series/text()',
        paymentDocNumber: '//participant[@typeCode="IND"]/associatedEntity/identity:DocInfo/identity:Number/text()',
        paymentINN: '//participant[@typeCode="IND"]/associatedEntity/identity:DocInfo/identity:INN/text()',
        paymentDocStartDate: '//participant[@typeCode="IND"]/associatedEntity/identity:DocInfo/identity:effectiveTime/identity:low/@value',
        paymentDocEndDate: '//participant[@typeCode="IND"]/associatedEntity/identity:DocInfo/identity:effectiveTime/identity:high/@value',
        paymentOrganizationId: '//participant[@typeCode="IND"]/associatedEntity/scopingOrganization/id/@extension',
        paymentOrganizationName: '//participant[@typeCode="IND"]/associatedEntity/scopingOrganization/name/text()',
        paymentOrganization_AddressStateCode: '//participant[@typeCode="IND"]/associatedEntity/scopingOrganization/addr/address:stateCode/@code'
    },
    sender: {
        senderId: '//participant[@typeCode="REF"]/associatedEntity/id[1]/@extension',
        senderSNILS: '//participant[@typeCode="REF"]/associatedEntity/id[2]/@extension',
        senderCode: '//participant[@typeCode="REF"]/associatedEntity/code/@code',
        senderFamily: '//participant[@typeCode="REF"]/associatedEntity/associatedPerson/name/family/text()',
        senderName: '//participant[@typeCode="REF"]/associatedEntity/associatedPerson/name/given/text()',
        senderPatronymic: '//participant[@typeCode="REF"]/associatedEntity/associatedPerson/name/identity:Patronymic/text()'
    },
    senderOrganization: {
        senderOrganization_Id: '//participant[@typeCode="REF"]/associatedEntity/scopingOrganization/id/@root',
        senderOrganization_UnitId: '//participant[@typeCode="REF"]/associatedEntity/scopingOrganization/id/@extension',
        senderOrganization_Name: '//participant[@typeCode="REF"]/associatedEntity/scopingOrganization/name/text()'
    },
    inFulfillmentOf: {
        referralId: '//inFulfillmentOf/order/id/@extension',
        referralCode: '//inFulfillmentOf/order/code/@code'
    },
    documentationOf: {
        eventCode: '//documentationOf/serviceEvent/code/@code',
        eventStartDate: '//documentationOf/serviceEvent/effectiveTime/low/@value',
        eventEndDate: '//documentationOf/serviceEvent/effectiveTime/high/@value',
        eventForm: '//documentationOf/serviceEvent/medService:serviceForm/@code',
        eventType: '//documentationOf/serviceEvent/medService:serviceType/@code',
        eventCondition: '//documentationOf/serviceEvent/medService:serviceCond/@code'
    },
    componentOf: {
        caseId: '//componentOf/encompassingEncounter/id[1]/@extension',
        MR_number: '//componentOf/encompassingEncounter/id[2]/@extension',
        MR_code: '//componentOf/encompassingEncounter/code/@code',
        MR_type: '//componentOf/encompassingEncounter/medService:DocType/@code',
        caseStartDate: '//componentOf/encompassingEncounter/effectiveTime/low/@value',
        caseEndDate: '//componentOf/encompassingEncounter/effectiveTime/high/@value',
        caseEndCode: '//componentOf/encompassingEncounter/dischargeDispositionCode/@code'
    },
    DEPARTINFO: [
        '//code[@codeSystem="1.2.643.5.1.13.13.99.2.197" and @code="DEPARTINFO"]/following-sibling::entry', {
            departStartDate: 'encounter/effectiveTime/low/@value',
            departEndDate: 'encounter/effectiveTime/high/@value',
            performerId: 'encounter/performer/assignedEntity/id[1]/@extension',
            performerSNILS: 'encounter/performer/assignedEntity/id[2]/@extension',
            performerCode: 'encounter/performer/assignedEntity/code/@code',
            performerFamily: 'encounter/performer/assignedEntity/assignedPerson/name/family/text()',
            performerName: 'encounter/performer/assignedEntity/assignedPerson/name/given/text()',
            performerPatronymic: 'encounter/performer/assignedEntity/assignedPerson/name/identity:Patronymic/text()',
            departCode: 'encounter/participant/participantRole/id/@root',
            departPaymentType: 'encounter/entryRelationship/observation/code[@codeSystem="1.2.643.5.1.13.13.99.2.166" and @code="827"]/following-sibling::value/@code',
            departBedType: 'encounter/entryRelationship/observation/code[@codeSystem="1.2.643.5.1.13.13.99.2.166" and @code="6024"]/following-sibling::value/@code',
            departDiagnosisCode: 'encounter/entryRelationship/observation/code[@codeSystem="1.2.643.5.1.13.13.99.2.166" and @code="838"]/following-sibling::value/@code',
            departStandardCode: 'encounter/entryRelationship/observation/code[@codeSystem="1.2.643.5.1.13.13.99.2.166" and @code="9043"]/following-sibling::value/text()',
            departAbortedCaseCode: 'encounter/entryRelationship/observation/code[@codeSystem="1.2.643.5.1.13.13.99.2.166" and @code="9044"]/following-sibling::value/text()'
        }
    ],
    SUR: [
        '//code[@codeSystem="1.2.643.5.1.13.13.99.2.197" and @code="SUR"]/following-sibling::entry', {
            surOperationCode: 'procedure/code/@code',
            surOperationName: 'procedure/text/text()',
            surOperationStartDate: 'procedure/effectiveTime/@value',
            performerId: 'procedure/performer/assignedEntity/id[1]/@extension',
            performerSNILS: 'procedure/performer/assignedEntity/id[2]/@extension',
            performerCode: 'procedure/performer/assignedEntity/code/@code',
            performerFamily: 'procedure/performer/assignedEntity/assignedPerson/name/family/text()',
            performerName: 'procedure/performer/assignedEntity/assignedPerson/name/given/text()',
            performerPatronymic: 'procedure/performer/assignedEntity/assignedPerson/name/identity:Patronymic/text()',
            departCode: 'procedure/participant/participantRole/id/@root',
            mainOperation: '//code[@codeSystem="1.2.643.5.1.13.13.99.2.166" and @code="9045"]/following-sibling::value/@value',
            anesthesiaCode: 'procedure/entryRelationship/substanceAdministration/consumable/manufacturedProduct/manufacturedLabeledDrug/code/@code',
            useEndoscopic: '//code[@codeSystem="1.2.643.5.1.13.13.11.1048" and @code="3"]/following-sibling::value/@value',
            useLaser: '//code[@codeSystem="1.2.643.5.1.13.13.11.1048" and @code="1"]/following-sibling::value/@value',
            useСryogenic: '//code[@codeSystem="1.2.643.5.1.13.13.11.1048" and @code="2"]/following-sibling::value/@value',
            useXray: '//code[@codeSystem="1.2.643.5.1.13.13.11.1048" and @code="4"]/following-sibling::value/@value',
            surPaymentType: 'procedure/entryRelationship/observation/code[@codeSystem="1.2.643.5.1.13.13.99.2.166" and @code="827"]/following-sibling::value/@code',
            STATEDIS_defects: [
                '//code[@codeSystem="1.2.643.5.1.13.13.99.2.166" and @code="12439"]/following-sibling::value', {
                    departStandardCode: '@code'
                }
            ],
            SUR_complications: [
                '//code[@codeSystem="1.2.643.5.1.13.13.99.2.197" and @code="SUR"]/following-sibling::entry/procedure/entryRelationship/observation/code[@codeSystem="1.2.643.5.1.13.13.99.2.166" and @code="12383"]', {
                    surCompName: 'following-sibling::text/text()',
                    surCompCode: 'following-sibling::value/@code'
                }
            ]
        }
    ],
    REFDGN: [
        '//code[@codeSystem="1.2.643.5.1.13.13.99.2.197" and @code="REFDGN"]/following-sibling::entry', {
            REFDGN_Type: 'observation/code/@code',
            REFDGN_Text: 'observation/text/text()',
            REFDGN_Code: 'observation/value/@code',
            REFDGN_pregnancyTerm: 'observation/code/following-sibling::entryRelationship/observation/code[@codeSystem="1.2.643.5.1.13.13.99.2.166" and @code="8004"]/following-sibling::value/translation/@value',
            REFDGN_pregnancyTermUnit: 'observation/code/following-sibling::entryRelationship/observation/code[@codeSystem="1.2.643.5.1.13.13.99.2.166" and @code="8004"]/following-sibling::value/translation/@code'
        }
    ],
    ERDGN: [
        '//code[@codeSystem="1.2.643.5.1.13.13.99.2.197" and @code="ERDGN"]/following-sibling::entry', {
            ERDGN_Type: 'observation/code/@code',
            ERDGN_Text: 'observation/text/text()',
            ERDGN_Code: 'observation/value/@code',
            ERDGN_pregnancyTerm: 'observation/code/following-sibling::entryRelationship/observation/code[@codeSystem="1.2.643.5.1.13.13.99.2.166" and @code="8004"]/following-sibling::value/translation/@value',
            ERDGN_pregnancyTermUnit: 'observation/code/following-sibling::entryRelationship/observation/code[@codeSystem="1.2.643.5.1.13.13.99.2.166" and @code="8004"]/following-sibling::value/translation/@code'
        }
    ],
    DGN: [
        '//code[@codeSystem="1.2.643.5.1.13.13.99.2.197" and @code="DGN"]/following-sibling::entry', {
            DGN_Type: 'observation/code/@code',
            DGN_Text: 'observation/text/text()',
            DGN_Code: 'observation/value/@code',
            DGN_pregnancyTerm: 'observation/code/following-sibling::entryRelationship/observation/code[@codeSystem="1.2.643.5.1.13.13.99.2.166" and @code="8004"]/following-sibling::value/translation/@value',
            DGN_pregnancyTermUnit: 'observation/code/following-sibling::entryRelationship/observation/code[@codeSystem="1.2.643.5.1.13.13.99.2.166" and @code="8004"]/following-sibling::value/translation/@code'
        }
    ],
    PATHANATDGN: [
        '//code[@codeSystem="1.2.643.5.1.13.13.99.2.197" and @code="PATHANATDGN"]/following-sibling::entry', {
            PATHANATDGN_Type: 'observation/code/@code',
            PATHANATDGN_Text: 'observation/text/text()',
            PATHANATDGN_Code: 'observation/value/@code',
            PATHANATDGN_pregnancyTerm: 'observation/code/following-sibling::entryRelationship/observation/code[@codeSystem="1.2.643.5.1.13.13.99.2.166" and @code="8004"]/following-sibling::value/translation/@value',
            PATHANATDGN_pregnancyTermUnit: 'observation/code/following-sibling::entryRelationship/observation/code[@codeSystem="1.2.643.5.1.13.13.99.2.166" and @code="8004"]/following-sibling::value/translation/@code'
        }
    ],
    extension: {
        statCardType: '//code[@codeSystem="1.2.643.5.1.13.13.99.2.166" and @code="11005"]/following-sibling::value/@code',
        socialStatus: '//code[@codeSystem="1.2.643.5.1.13.13.99.2.166" and @code="12088"]/following-sibling::value/@code',
        soldierCategory: '//code[@codeSystem="1.2.643.5.1.13.13.99.2.166" and @code="9051"]/following-sibling::value/@code',
        pregnancyNumber: '//code[@codeSystem="1.2.643.5.1.13.13.99.2.166" and @code="12310"]/following-sibling::value/@value',
        benefitCategory: '//code[@codeSystem="1.2.643.5.1.13.13.99.2.166" and @code="811"]/following-sibling::value/@code',
        hospChannelCode: '//code[@codeSystem="1.2.643.5.1.13.13.11.1496"]/@code',
        ambulanceSquadNumber: '//code[@codeSystem="1.2.643.5.1.13.13.11.1496"]/following-sibling::text/text()',
        hospChannelText: '//code[@codeSystem="1.2.643.5.1.13.13.11.1496"]/following-sibling::value/text()',
        intoxicationType: '//code[@codeSystem="1.2.643.5.1.13.13.99.2.166" and @code="12089"]/following-sibling::value/@code',
        hospCaseType: '//code[@codeSystem="1.2.643.5.1.13.13.99.2.166" and @code="817"]/following-sibling::value/@code',
        timeBeforeHospitalization: '//code[@codeSystem="1.2.643.5.1.13.13.99.2.166" and @code="9042"]/following-sibling::value/@code',
        traumaType: '//code[@codeSystem="1.2.643.5.1.13.13.99.2.166" and @code="824"]/following-sibling::value/@code',
        hospDuration: '//code[@codeSystem="1.2.643.5.1.13.13.99.2.166" and @code="9046"]/following-sibling::value/text()',
        hospResult: '//code[@codeSystem="1.2.643.5.1.13.13.99.2.166" and @code="818"]/following-sibling::value/@code',
        checkRW1: '//code[@codeSystem="1.2.643.5.1.13.13.99.2.166" and @code="9047"]/following-sibling::value/@value',
        checkAIDS2: '//code[@codeSystem="1.2.643.5.1.13.13.99.2.166" and @code="9048"]/following-sibling::value/@value',
        deathСause: '//code[@codeSystem="1.2.643.5.1.13.13.99.2.166" and @code="12440"]/following-sibling::value/@code',
        refDocDate: '//code[@codeSystem="1.2.643.5.1.13.13.99.2.197" and @code="LINKDOCS"]/following-sibling::entry/act/code[@codeSystem="1.2.643.5.1.13.13.11.1522" and (@code="3" or @code="346" or @code="365")]/following-sibling::effectiveTime/@value',
        refDocNumber: '//code[@codeSystem="1.2.643.5.1.13.13.99.2.197" and @code="LINKDOCS"]/following-sibling::entry/act/code[@codeSystem="1.2.643.5.1.13.13.11.1522" and (@code="3" or @code="346" or @code="365")]/following-sibling::entryRelationship/observation/code[@codeSystem="1.2.643.5.1.13.13.99.2.166" and @code="11003"]/following-sibling::value/text()',
        disabilityDocOpenDate: '//code[@codeSystem="1.2.643.5.1.13.13.99.2.166" and @code="6052"]/following-sibling::effectiveTime/low/@value',
        disabilityDocCloseDate: '//code[@codeSystem="1.2.643.5.1.13.13.99.2.166" and @code="6052"]/following-sibling::effectiveTime/high/@value',
        disabilityAge: '//code[@codeSystem="1.2.643.5.1.13.13.99.2.166" and @code="9049"]/following-sibling::value/@value',
        disabilitySex: '//code[@codeSystem="1.2.643.5.1.13.13.99.2.166" and @code="9050"]/following-sibling::value/@code'
    }
}