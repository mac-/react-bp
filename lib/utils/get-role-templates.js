export default function getRoleTemplates(orgId, studentRoleId) {
	return {
		'Super Admin': {
			read: [
				`organizations@${orgId}`,
				`roles:organizations@${orgId}`,
				`courses:organizations@${orgId}`,
				`contentItems>courses:organizations@${orgId}`,
				`classrooms>courses:organizations@${orgId}`,
				`schools>organizations@${orgId}`,
				`clients:roles:organizations@${orgId}`,
				`profiles>clients:roles:organizations@${orgId}`,
				`extendedProfiles>clients:roles:organizations@${orgId}`,
				`answers>clients:roles:organizations@${orgId}`,
				`enrollments>clients:roles:organizations@${orgId}`,
				`scores>answers>clients:roles:organizations@${orgId}`,
				`exams>courses:organizations@${orgId}`,
				`questions>exams>courses:organizations@${orgId}`,
				`choices>questions>exams>courses:organizations@${orgId}`,
				`fireWords`,
				`fireWordCaptures>clients:roles:organizations@${orgId}`,
				`fireWordAcknowledgements>clients:roles:organizations@${orgId}`
			],
			create: [
				`clients`,
				`profiles>clients:roles:organizations@${orgId}`,
				`classrooms>courses:organizations@${orgId}`,
				`extendedProfiles>clients:roles:organizations@${orgId}`,
				`schools>organizations@${orgId}`,
				`fireWordAcknowledgements>clients:roles:organizations@${orgId}`,
				`enrollments>clients:roles:organizations@${orgId}`,
				`answers>clients@{self}`,
				`scores>answers>clients@{self}`,
				`scores>answers>clients:roles:organizations@${orgId}`,
				`fireWordCaptures>clients@{self}`
			],
			update: [
				`organizations@${orgId}`,
				`schools>organizations@${orgId}`,
				`classrooms>courses:organizations@${orgId}`,
				`clients:roles:organizations@${orgId}`,
				`profiles>clients:roles:organizations@${orgId}`,
				`extendedProfiles>clients:roles:organizations@${orgId}`,
				`scores>answers>clients:roles:organizations@${orgId}`,
				`fireWordAcknowledgements>clients:roles:organizations@${orgId}`,
				`enrollments>clients:roles:organizations@${orgId}`,
				`answers>clients@{self}`
			],
			delete: [
				`schools>organizations@${orgId}`,
				`clients:roles:organizations@${orgId}`,
				`classrooms>courses:organizations@${orgId}`,
				`profiles>clients:roles:organizations@${orgId}`,
				`extendedProfiles>clients:roles:organizations@${orgId}`,
				`scores>answers>clients:roles:organizations@${orgId}`,
				`fireWordAcknowledgements>clients:roles:organizations@${orgId}`,
				`enrollments>clients:roles:organizations@${orgId}`,
				`answers>clients@{self}`,
				`fireWordCaptures>clients@{self}`
			],
			auth: [`clients:roles:organizations@${orgId}`]
		},
		'Admin': {
			read: [
				`organizations@${orgId}`,
				`roles:organizations@${orgId}`,
				`courses:organizations@${orgId}`,
				`contentItems>courses:organizations@${orgId}`,
				`classrooms>courses:organizations@${orgId}`,
				`schools>organizations@${orgId}`,
				`clients:roles@${studentRoleId}`,
				`profiles>clients:roles@${studentRoleId}`,
				`extendedProfiles>clients:roles@${studentRoleId}`,
				`answers>clients:roles@${studentRoleId}`,
				`enrollments>clients:roles@${studentRoleId}`,
				`scores>answers>clients:roles@${studentRoleId}`,
				`exams>courses:organizations@${orgId}`,
				`questions>exams>courses:organizations@${orgId}`,
				`choices>questions>exams>courses:organizations@${orgId}`,
				`fireWords`,
				`fireWordCaptures>clients:roles@${studentRoleId}`,
				`fireWordAcknowledgements>clients:roles@${studentRoleId}`,
				`answers>clients@{self}`,
				`scores>answers>clients@{self}`,
				`enrollments>clients@{self}`,
				`profiles>clients@{self}`,
				`extendedProfiles>clients@{self}`
			],
			create: [
				`clients`,
				`profiles>clients:roles@${studentRoleId}`,
				`classrooms>courses:organizations@${orgId}`,
				`extendedProfiles>clients@${studentRoleId}`,
				`schools>organizations@${orgId}`,
				`fireWordAcknowledgements>clients:roles@${studentRoleId}`,
				`enrollments>clients:roles@${studentRoleId}`,
				`answers>clients@{self}`,
				`scores>answers>clients:roles@${studentRoleId}`,
				`scores>answers>clients@{self}`,
				`fireWordCaptures>clients@{self}`,
				`enrollments>clients@{self}`,
				`profiles>clients@{self}`,
				`extendedProfiles>clients@{self}`
			],
			update: [
				`schools>organizations@${orgId}`,
				`classrooms>courses:organizations@${orgId}`,
				`clients:roles@${studentRoleId}`,
				`profiles>clients:roles@${studentRoleId}`,
				`extendedProfiles>clients:roles@${studentRoleId}`,
				`scores>answers>clients:roles@${studentRoleId}`,
				`fireWordAcknowledgements>clients:roles@${studentRoleId}`,
				`enrollments>clients:roles@${studentRoleId}`,
				`answers>clients@{self}`,
				`enrollments>clients@{self}`,
				`profiles>clients@{self}`,
				`extendedProfiles>clients@{self}`
			],
			delete: [
				`schools>organizations@${orgId}`,
				`clients:roles@${studentRoleId}`,
				`classrooms>courses:organizations@${orgId}`,
				`profiles>clients:roles@${studentRoleId}`,
				`extendedProfiles>clients:roles@${studentRoleId}`,
				`scores>answers>clients:roles@${studentRoleId}`,
				`fireWordAcknowledgements>clients:roles@${studentRoleId}`,
				`enrollments>clients:roles@${studentRoleId}`,
				`enrollments>clients@{self}`,
				`answers>clients@{self}`,
				`fireWordCaptures>clients@{self}`,
				`profiles>clients@{self}`,
				`extendedProfiles>clients@{self}`
			],
			auth: [`clients:roles@${studentRoleId}`]
		},
		'Student': {
			read: [
				`organizations@${orgId}`,
				`courses:organizations@${orgId}`,
				`contentItems>courses:organizations@${orgId}`,
				`classrooms>courses:organizations@${orgId}`,
				`schools>organizations@${orgId}`,
				`clients@{self}`,
				`profiles>clients@{self}`,
				`extendedProfiles>clients@{self}`,
				`answers>clients@{self}`,
				`enrollments>clients@{self}`,
				`exams>courses:organizations@${orgId}`,
				`questions>exams>courses:organizations@${orgId}`,
				`choices>questions>exams>courses:organizations@${orgId}`,
				`fireWords`
			],
			create: [
				`answers>clients@{self}`,
				`fireWordCaptures>clients@{self}`
			],
			update: [],
			delete: [],
			auth: []
		},
		'None': {
			read: [],
			create: [],
			update: [],
			delete: [],
			auth: []
		}
	};
}