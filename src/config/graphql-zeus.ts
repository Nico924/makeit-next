/* tslint:disable */
/* eslint-disable */

export type ValueTypes = {
    ["AccountGenderEnum"]:AccountGenderEnum;
	["AccountModel"]: AliasType<{
	_id?:true,
	organisationId?:true,
	createdBy?:true,
	updatedBy?:true,
	deletedBy?:true,
	createdAt?:true,
	updatedAt?:true,
	r?:true,
	w?:true,
	d?:true,
	types?:true,
	organisationIds?:true,
	email?:true,
	userName?:true,
	firstName?:true,
	lastName?:true,
	profilePicture?:ValueTypes["ImageComponent"],
	phoneNumber?:true,
	gender?:true,
	birthDate?:true,
	age?:true,
	address?:ValueTypes["AddressComponent"],
	language?:true,
	postCode?:true
		__typename?: true
}>;
	["AccountTypeEnum"]:AccountTypeEnum;
	["AddressComponent"]: AliasType<{
	number?:true,
	street?:true,
	streetBis?:true,
	floor?:true,
	box?:true,
	zip?:true,
	state?:true,
	city?:true,
	country?:true
		__typename?: true
}>;
	["AddressInput"]: {
	number?:string,
	street?:string,
	streetBis?:string,
	floor?:string,
	box?:string,
	zip?:string,
	state?:string,
	city:string,
	country:string
};
	["ArticleModel"]: AliasType<{
	_id?:true,
	organisationId?:true,
	createdBy?:true,
	updatedBy?:true,
	deletedBy?:true,
	createdAt?:true,
	updatedAt?:true,
	r?:true,
	w?:true,
	d?:true,
	title?:ValueTypes["TranslatableComponent"],
	teaser?:ValueTypes["TranslatableComponent"],
	cover?:ValueTypes["ImageComponent"],
	thumbnail?:ValueTypes["ImageComponent"],
	extraImages?:ValueTypes["ImageComponent"],
	content?:ValueTypes["TranslatableComponent"],
	seo?:ValueTypes["SEOField"],
	urls?:ValueTypes["TranslatableComponent"],
	published?:true,
	publicationDate?:true,
	private?:true,
	categoryIds?:true,
	getCategories?:ValueTypes["CategoryModel"],
	downloadableRessources?:ValueTypes["ImageComponent"],
	authorId?:true,
	getAuthor?:ValueTypes["AuthorModel"],
comments?: [{	pagination?:ValueTypes["GetArgs"]},ValueTypes["CommentModel"]],
relatedArticles?: [{	_ids?:string[],	search?:string,	afterCreatedAt?:ValueTypes["DateTime"],	afterUpdatedAt?:ValueTypes["DateTime"],	pagination?:ValueTypes["GetArgs"],	categories?:string[]},ValueTypes["ArticleModel"]],
	index?:true,
	viewsCount?:true
		__typename?: true
}>;
	["AuthorModel"]: AliasType<{
	_id?:true,
	organisationId?:true,
	createdBy?:true,
	updatedBy?:true,
	deletedBy?:true,
	createdAt?:true,
	updatedAt?:true,
	r?:true,
	w?:true,
	d?:true,
	types?:true,
	organisationIds?:true,
	email?:true,
	userName?:true,
	firstName?:true,
	lastName?:true,
	profilePicture?:ValueTypes["ImageComponent"],
	phoneNumber?:true,
	gender?:true,
	birthDate?:true,
	age?:true,
	address?:ValueTypes["AddressComponent"],
	language?:true,
	bio?:ValueTypes["TranslatableComponent"]
		__typename?: true
}>;
	["AvailableLanguage"]:AvailableLanguage;
	["CategoryModel"]: AliasType<{
	_id?:true,
	organisationId?:true,
	createdBy?:true,
	updatedBy?:true,
	deletedBy?:true,
	createdAt?:true,
	updatedAt?:true,
	r?:true,
	w?:true,
	d?:true,
	title?:ValueTypes["TranslatableComponent"],
	teaser?:ValueTypes["TranslatableComponent"],
	cover?:ValueTypes["ImageComponent"],
	thumbnail?:ValueTypes["ImageComponent"],
	extraImages?:ValueTypes["ImageComponent"],
	content?:ValueTypes["TranslatableComponent"],
	seo?:ValueTypes["SEOField"],
	urls?:ValueTypes["TranslatableComponent"],
	ressourceType?:true,
	colorCode?:true
		__typename?: true
}>;
	["CommentModel"]: AliasType<{
	_id?:true,
	organisationId?:true,
	createdBy?:true,
	updatedBy?:true,
	deletedBy?:true,
	createdAt?:true,
	updatedAt?:true,
	r?:true,
	w?:true,
	d?:true,
	ressourceModel?:true,
	ressourceId?:true,
	comment?:true,
	edited?:true,
	deleted?:true,
	file?:ValueTypes["ImageComponent"],
	sentBy?:true,
	parentId?:true,
	numberReplies?:true,
	replies?:ValueTypes["CommentModel"]
		__typename?: true
}>;
	["CommentModelEnum"]:CommentModelEnum;
	/** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
["DateTime"]:unknown;
	["EditAccountInput"]: {
	userName?:string,
	firstName?:string,
	lastName?:string,
	profilePicture?:ValueTypes["ImageInput"],
	phoneNumber?:string,
	gender?:ValueTypes["AccountGenderEnum"],
	birthDate?:ValueTypes["DateTime"],
	address?:ValueTypes["AddressInput"],
	language?:ValueTypes["AvailableLanguage"],
	postCode?:number
};
	["EmailConfirmationData"]: AliasType<{
	MJ_templateId?:true
		__typename?: true
}>;
	["FieldSchema"]: AliasType<{
	required?:true,
	type?:true,
	list?:true
		__typename?: true
}>;
	["FieldType"]:FieldType;
	["FirebaseTokenResult"]: AliasType<{
	localId?:true,
	email?:true,
	displayName?:true,
	idToken?:true,
	registered?:true,
	refreshToken?:true,
	expiresIn?:true
		__typename?: true
}>;
	["FormData"]: AliasType<{
	title?:true,
	label?:ValueTypes["TranslatableComponent"],
	placeholder?:ValueTypes["TranslatableComponent"],
	schema?:ValueTypes["FieldSchema"],
	position?:true
		__typename?: true
}>;
	["FormModel"]: AliasType<{
	_id?:true,
	organisationId?:true,
	createdBy?:true,
	updatedBy?:true,
	deletedBy?:true,
	createdAt?:true,
	updatedAt?:true,
	r?:true,
	w?:true,
	d?:true,
	title?:true,
	formData?:ValueTypes["FormData"],
	emailConfirmationData?:ValueTypes["EmailConfirmationData"],
	marketingData?:ValueTypes["MarketingData"]
		__typename?: true
}>;
	["FormSubmissionModel"]: AliasType<{
	_id?:true,
	organisationId?:true,
	createdBy?:true,
	updatedBy?:true,
	deletedBy?:true,
	createdAt?:true,
	updatedAt?:true,
	r?:true,
	w?:true,
	d?:true,
	formId?:true,
	formData?:true
		__typename?: true
}>;
	["GetArgs"]: {
	limit:number,
	skip:number,
	sort?:string
};
	["ImageComponent"]: AliasType<{
	large?:true,
	medium?:true,
	small?:true
		__typename?: true
}>;
	["ImageInput"]: {
	large:string,
	medium?:string,
	small?:string
};
	/** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
["JSONObject"]:unknown;
	["LinkEmailInput"]: {
	email:string,
	password:string,
	idToken:string
};
	["ListEnum"]:ListEnum;
	["ListModel"]: AliasType<{
	_id?:true,
	organisationId?:true,
	createdBy?:true,
	updatedBy?:true,
	deletedBy?:true,
	createdAt?:true,
	updatedAt?:true,
	r?:true,
	w?:true,
	d?:true,
	title?:ValueTypes["TranslatableComponent"],
	teaser?:ValueTypes["TranslatableComponent"],
	cover?:ValueTypes["ImageComponent"],
	thumbnail?:ValueTypes["ImageComponent"],
	extraImages?:ValueTypes["ImageComponent"],
	content?:ValueTypes["TranslatableComponent"],
	seo?:ValueTypes["SEOField"],
	urls?:ValueTypes["TranslatableComponent"],
	ressourceType?:true,
	colorCode?:true
		__typename?: true
}>;
	["LoginInput"]: {
	email:string,
	password:string
};
	["MarketingData"]: AliasType<{
	AC_listId?:true
		__typename?: true
}>;
	["Mutation"]: AliasType<{
updateMe?: [{	input:ValueTypes["EditAccountInput"]},ValueTypes["AccountModel"]],
updateMeEmail?: [{	input:ValueTypes["NewEmailInput"]},ValueTypes["AccountModel"]],
updateMePassword?: [{	input:ValueTypes["NewPasswordInput"]},ValueTypes["AccountModel"]],
resetPassword?: [{	input:ValueTypes["ResetPasswordInput"]},ValueTypes["SimpleResult"]],
registerGuest?: [{	otherInfo:ValueTypes["EditAccountInput"],	input:ValueTypes["LinkEmailInput"]},ValueTypes["AccountModel"]],
formsSubmitOne?: [{	input:ValueTypes["NewFormSubmissionInput"],	id:string},ValueTypes["FormSubmissionModel"]]
		__typename?: true
}>;
	["NewEmailInput"]: {
	newEmail:string
};
	["NewFormSubmissionInput"]: {
	formData:ValueTypes["JSONObject"]
};
	["NewPasswordInput"]: {
	newPassword:string,
	newPasswordConfirmation:string
};
	["PageModel"]: AliasType<{
	_id?:true,
	organisationId?:true,
	createdBy?:true,
	updatedBy?:true,
	deletedBy?:true,
	createdAt?:true,
	updatedAt?:true,
	r?:true,
	w?:true,
	d?:true,
	title?:true,
	label?:true,
	content?:true,
	position?:true,
	toComplete?:true
		__typename?: true
}>;
	["Query"]: AliasType<{
	me?:ValueTypes["AccountModel"],
login?: [{	refreshToken?:string,	creds?:ValueTypes["LoginInput"]},ValueTypes["FirebaseTokenResult"]],
formsGetOne?: [{	id:string},ValueTypes["FormModel"]],
articlesGetOne?: [{	id:string},ValueTypes["ArticleModel"]],
articlesGetOneByUrl?: [{	url:string,	language:string},ValueTypes["ArticleModel"]],
articlesGetMany?: [{	_ids?:string[],	search?:string,	afterCreatedAt?:ValueTypes["DateTime"],	afterUpdatedAt?:ValueTypes["DateTime"],	pagination?:ValueTypes["GetArgs"],	categories?:string[]},ValueTypes["ArticleModel"]],
articlesGetManyForMembers?: [{	_ids?:string[],	search?:string,	afterCreatedAt?:ValueTypes["DateTime"],	afterUpdatedAt?:ValueTypes["DateTime"],	pagination?:ValueTypes["GetArgs"],	categories?:string[]},ValueTypes["ArticleModel"]],
categoriesGetOne?: [{	id:string},ValueTypes["CategoryModel"]],
categoriesGetMany?: [{	search?:string,	ressourceType:ValueTypes["RessourceEnum"],	pagination?:ValueTypes["GetArgs"]},ValueTypes["CategoryModel"]],
categoriesGetCount?: [{	search?:string,	ressourceType:ValueTypes["RessourceEnum"],	pagination?:ValueTypes["GetArgs"]},true],
pagesGetOne?: [{	id:string},ValueTypes["PageModel"]],
pagesGetMany?: [{	pagination?:ValueTypes["GetArgs"]},ValueTypes["PageModel"]],
pagesGetCount?: [{	pagination?:ValueTypes["GetArgs"]},true],
listsGetOne?: [{	id:string},ValueTypes["ListModel"]],
listsGetMany?: [{	search?:string,	ressourceType:ValueTypes["RessourceEnum"],	pagination?:ValueTypes["GetArgs"]},ValueTypes["ListModel"]],
listsGetCount?: [{	search?:string,	ressourceType:ValueTypes["RessourceEnum"],	pagination?:ValueTypes["GetArgs"]},true]
		__typename?: true
}>;
	["ResetPasswordInput"]: {
	email:string
};
	["RessourceEnum"]:RessourceEnum;
	["SEOField"]: AliasType<{
	title?:ValueTypes["TranslatableComponent"],
	description?:ValueTypes["TranslatableComponent"],
	keywords?:ValueTypes["TranslatableComponent"],
	thumbnail?:ValueTypes["ImageComponent"]
		__typename?: true
}>;
	["SimpleResult"]: AliasType<{
	message?:true
		__typename?: true
}>;
	["TranslatableComponent"]: AliasType<{
	en?:true
		__typename?: true
}>
  }

export type PartialObjects = {
    ["AccountGenderEnum"]:AccountGenderEnum,
	["AccountModel"]: {
		__typename?: "AccountModel";
			_id?:string,
			organisationId?:string,
			createdBy?:string,
			updatedBy?:string,
			deletedBy?:string,
			createdAt?:PartialObjects["DateTime"],
			updatedAt?:PartialObjects["DateTime"],
			r?:string[],
			w?:string[],
			d?:string[],
			types?:PartialObjects["AccountTypeEnum"][],
			organisationIds?:string[],
			email?:string,
			userName?:string,
			firstName?:string,
			lastName?:string,
			profilePicture?:PartialObjects["ImageComponent"],
			phoneNumber?:string,
			gender?:PartialObjects["AccountGenderEnum"],
			birthDate?:PartialObjects["DateTime"],
			age?:number,
			address?:PartialObjects["AddressComponent"],
			language?:PartialObjects["AvailableLanguage"],
			postCode?:number
	},
	["AccountTypeEnum"]:AccountTypeEnum,
	["AddressComponent"]: {
		__typename?: "AddressComponent";
			number?:string,
			street?:string,
			streetBis?:string,
			floor?:string,
			box?:string,
			zip?:string,
			state?:string,
			city?:string,
			country?:string
	},
	["AddressInput"]: {
	number?:string,
	street?:string,
	streetBis?:string,
	floor?:string,
	box?:string,
	zip?:string,
	state?:string,
	city:string,
	country:string
},
	["ArticleModel"]: {
		__typename?: "ArticleModel";
			_id?:string,
			organisationId?:string,
			createdBy?:string,
			updatedBy?:string,
			deletedBy?:string,
			createdAt?:PartialObjects["DateTime"],
			updatedAt?:PartialObjects["DateTime"],
			r?:string[],
			w?:string[],
			d?:string[],
			title?:PartialObjects["TranslatableComponent"],
			teaser?:PartialObjects["TranslatableComponent"],
			cover?:PartialObjects["ImageComponent"],
			thumbnail?:PartialObjects["ImageComponent"],
			extraImages?:PartialObjects["ImageComponent"][],
			content?:PartialObjects["TranslatableComponent"],
			seo?:PartialObjects["SEOField"],
			urls?:PartialObjects["TranslatableComponent"],
			published?:boolean,
			publicationDate?:PartialObjects["DateTime"],
			private?:boolean,
			categoryIds?:string[],
			getCategories?:PartialObjects["CategoryModel"][],
			downloadableRessources?:PartialObjects["ImageComponent"][],
			authorId?:string,
			getAuthor?:PartialObjects["AuthorModel"],
			comments?:PartialObjects["CommentModel"][],
			relatedArticles?:PartialObjects["ArticleModel"][],
			index?:string,
			viewsCount?:number
	},
	["AuthorModel"]: {
		__typename?: "AuthorModel";
			_id?:string,
			organisationId?:string,
			createdBy?:string,
			updatedBy?:string,
			deletedBy?:string,
			createdAt?:PartialObjects["DateTime"],
			updatedAt?:PartialObjects["DateTime"],
			r?:string[],
			w?:string[],
			d?:string[],
			types?:PartialObjects["AccountTypeEnum"][],
			organisationIds?:string[],
			email?:string,
			userName?:string,
			firstName?:string,
			lastName?:string,
			profilePicture?:PartialObjects["ImageComponent"],
			phoneNumber?:string,
			gender?:PartialObjects["AccountGenderEnum"],
			birthDate?:PartialObjects["DateTime"],
			age?:number,
			address?:PartialObjects["AddressComponent"],
			language?:PartialObjects["AvailableLanguage"],
			bio?:PartialObjects["TranslatableComponent"]
	},
	["AvailableLanguage"]:AvailableLanguage,
	["CategoryModel"]: {
		__typename?: "CategoryModel";
			_id?:string,
			organisationId?:string,
			createdBy?:string,
			updatedBy?:string,
			deletedBy?:string,
			createdAt?:PartialObjects["DateTime"],
			updatedAt?:PartialObjects["DateTime"],
			r?:string[],
			w?:string[],
			d?:string[],
			title?:PartialObjects["TranslatableComponent"],
			teaser?:PartialObjects["TranslatableComponent"],
			cover?:PartialObjects["ImageComponent"],
			thumbnail?:PartialObjects["ImageComponent"],
			extraImages?:PartialObjects["ImageComponent"][],
			content?:PartialObjects["TranslatableComponent"],
			seo?:PartialObjects["SEOField"],
			urls?:PartialObjects["TranslatableComponent"],
			ressourceType?:PartialObjects["RessourceEnum"],
			colorCode?:string
	},
	["CommentModel"]: {
		__typename?: "CommentModel";
			_id?:string,
			organisationId?:string,
			createdBy?:string,
			updatedBy?:string,
			deletedBy?:string,
			createdAt?:PartialObjects["DateTime"],
			updatedAt?:PartialObjects["DateTime"],
			r?:string[],
			w?:string[],
			d?:string[],
			ressourceModel?:PartialObjects["CommentModelEnum"],
			ressourceId?:string,
			comment?:string,
			edited?:boolean,
			deleted?:boolean,
			file?:PartialObjects["ImageComponent"],
			sentBy?:string,
			parentId?:string,
			numberReplies?:number,
			replies?:PartialObjects["CommentModel"][]
	},
	["CommentModelEnum"]:CommentModelEnum,
	/** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
["DateTime"]:any,
	["EditAccountInput"]: {
	userName?:string,
	firstName?:string,
	lastName?:string,
	profilePicture?:PartialObjects["ImageInput"],
	phoneNumber?:string,
	gender?:PartialObjects["AccountGenderEnum"],
	birthDate?:PartialObjects["DateTime"],
	address?:PartialObjects["AddressInput"],
	language?:PartialObjects["AvailableLanguage"],
	postCode?:number
},
	["EmailConfirmationData"]: {
		__typename?: "EmailConfirmationData";
			MJ_templateId?:string
	},
	["FieldSchema"]: {
		__typename?: "FieldSchema";
			required?:boolean,
			type?:PartialObjects["FieldType"],
			list?:PartialObjects["JSONObject"][]
	},
	["FieldType"]:FieldType,
	["FirebaseTokenResult"]: {
		__typename?: "FirebaseTokenResult";
			localId?:string,
			email?:string,
			displayName?:string,
			idToken?:string,
			registered?:boolean,
			refreshToken?:string,
			expiresIn?:string
	},
	["FormData"]: {
		__typename?: "FormData";
			title?:string,
			label?:PartialObjects["TranslatableComponent"],
			placeholder?:PartialObjects["TranslatableComponent"],
			schema?:PartialObjects["FieldSchema"],
			position?:number
	},
	["FormModel"]: {
		__typename?: "FormModel";
			_id?:string,
			organisationId?:string,
			createdBy?:string,
			updatedBy?:string,
			deletedBy?:string,
			createdAt?:PartialObjects["DateTime"],
			updatedAt?:PartialObjects["DateTime"],
			r?:string[],
			w?:string[],
			d?:string[],
			title?:string,
			formData?:PartialObjects["FormData"][],
			emailConfirmationData?:PartialObjects["EmailConfirmationData"],
			marketingData?:PartialObjects["MarketingData"]
	},
	["FormSubmissionModel"]: {
		__typename?: "FormSubmissionModel";
			_id?:string,
			organisationId?:string,
			createdBy?:string,
			updatedBy?:string,
			deletedBy?:string,
			createdAt?:PartialObjects["DateTime"],
			updatedAt?:PartialObjects["DateTime"],
			r?:string[],
			w?:string[],
			d?:string[],
			formId?:string,
			formData?:PartialObjects["JSONObject"]
	},
	["GetArgs"]: {
	limit:number,
	skip:number,
	sort?:string
},
	["ImageComponent"]: {
		__typename?: "ImageComponent";
			large?:string,
			medium?:string,
			small?:string
	},
	["ImageInput"]: {
	large:string,
	medium?:string,
	small?:string
},
	/** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
["JSONObject"]:any,
	["LinkEmailInput"]: {
	email:string,
	password:string,
	idToken:string
},
	["ListEnum"]:ListEnum,
	["ListModel"]: {
		__typename?: "ListModel";
			_id?:string,
			organisationId?:string,
			createdBy?:string,
			updatedBy?:string,
			deletedBy?:string,
			createdAt?:PartialObjects["DateTime"],
			updatedAt?:PartialObjects["DateTime"],
			r?:string[],
			w?:string[],
			d?:string[],
			title?:PartialObjects["TranslatableComponent"],
			teaser?:PartialObjects["TranslatableComponent"],
			cover?:PartialObjects["ImageComponent"],
			thumbnail?:PartialObjects["ImageComponent"],
			extraImages?:PartialObjects["ImageComponent"][],
			content?:PartialObjects["TranslatableComponent"],
			seo?:PartialObjects["SEOField"],
			urls?:PartialObjects["TranslatableComponent"],
			ressourceType?:PartialObjects["ListEnum"],
			colorCode?:string
	},
	["LoginInput"]: {
	email:string,
	password:string
},
	["MarketingData"]: {
		__typename?: "MarketingData";
			AC_listId?:string
	},
	["Mutation"]: {
		__typename?: "Mutation";
			updateMe?:PartialObjects["AccountModel"],
			updateMeEmail?:PartialObjects["AccountModel"],
			updateMePassword?:PartialObjects["AccountModel"],
			resetPassword?:PartialObjects["SimpleResult"],
			registerGuest?:PartialObjects["AccountModel"],
			formsSubmitOne?:PartialObjects["FormSubmissionModel"]
	},
	["NewEmailInput"]: {
	newEmail:string
},
	["NewFormSubmissionInput"]: {
	formData:PartialObjects["JSONObject"]
},
	["NewPasswordInput"]: {
	newPassword:string,
	newPasswordConfirmation:string
},
	["PageModel"]: {
		__typename?: "PageModel";
			_id?:string,
			organisationId?:string,
			createdBy?:string,
			updatedBy?:string,
			deletedBy?:string,
			createdAt?:PartialObjects["DateTime"],
			updatedAt?:PartialObjects["DateTime"],
			r?:string[],
			w?:string[],
			d?:string[],
			title?:string,
			label?:string,
			content?:PartialObjects["JSONObject"],
			position?:number,
			toComplete?:boolean
	},
	["Query"]: {
		__typename?: "Query";
			me?:PartialObjects["AccountModel"],
			login?:PartialObjects["FirebaseTokenResult"],
			formsGetOne?:PartialObjects["FormModel"],
			articlesGetOne?:PartialObjects["ArticleModel"],
			articlesGetOneByUrl?:PartialObjects["ArticleModel"],
			articlesGetMany?:PartialObjects["ArticleModel"][],
			articlesGetManyForMembers?:PartialObjects["ArticleModel"][],
			categoriesGetOne?:PartialObjects["CategoryModel"],
			categoriesGetMany?:PartialObjects["CategoryModel"][],
			categoriesGetCount?:number,
			pagesGetOne?:PartialObjects["PageModel"],
			pagesGetMany?:PartialObjects["PageModel"][],
			pagesGetCount?:number,
			listsGetOne?:PartialObjects["ListModel"],
			listsGetMany?:PartialObjects["ListModel"][],
			listsGetCount?:number
	},
	["ResetPasswordInput"]: {
	email:string
},
	["RessourceEnum"]:RessourceEnum,
	["SEOField"]: {
		__typename?: "SEOField";
			title?:PartialObjects["TranslatableComponent"],
			description?:PartialObjects["TranslatableComponent"],
			keywords?:PartialObjects["TranslatableComponent"],
			thumbnail?:PartialObjects["ImageComponent"]
	},
	["SimpleResult"]: {
		__typename?: "SimpleResult";
			message?:string
	},
	["TranslatableComponent"]: {
		__typename?: "TranslatableComponent";
			en?:string
	}
  }

export enum AccountGenderEnum {
	m = "m",
	f = "f",
	other = "other"
}

export type AccountModel = {
	__typename?: "AccountModel",
	_id:string,
	organisationId?:string,
	createdBy:string,
	updatedBy:string,
	deletedBy:string,
	createdAt:DateTime,
	updatedAt:DateTime,
	r:string[],
	w:string[],
	d:string[],
	types:AccountTypeEnum[],
	organisationIds?:string[],
	email:string,
	userName:string,
	firstName?:string,
	lastName?:string,
	profilePicture?:ImageComponent,
	phoneNumber?:string,
	gender:AccountGenderEnum,
	birthDate?:DateTime,
	age?:number,
	address?:AddressComponent,
	language?:AvailableLanguage,
	postCode:number
}

export enum AccountTypeEnum {
	admin = "admin",
	user = "user",
	blogAuthor = "blogAuthor",
	public = "public"
}

export type AddressComponent = {
	__typename?: "AddressComponent",
	number?:string,
	street?:string,
	streetBis?:string,
	floor?:string,
	box?:string,
	zip?:string,
	state?:string,
	city:string,
	country:string
}

export type AddressInput = {
		number?:string,
	street?:string,
	streetBis?:string,
	floor?:string,
	box?:string,
	zip?:string,
	state?:string,
	city:string,
	country:string
}

export type ArticleModel = {
	__typename?: "ArticleModel",
	_id:string,
	organisationId?:string,
	createdBy:string,
	updatedBy:string,
	deletedBy:string,
	createdAt:DateTime,
	updatedAt:DateTime,
	r:string[],
	w:string[],
	d:string[],
	title?:TranslatableComponent,
	teaser?:TranslatableComponent,
	cover?:ImageComponent,
	thumbnail?:ImageComponent,
	extraImages?:ImageComponent[],
	content?:TranslatableComponent,
	seo?:SEOField,
	urls?:TranslatableComponent,
	published:boolean,
	publicationDate?:DateTime,
	private?:boolean,
	categoryIds?:string[],
	getCategories:CategoryModel[],
	downloadableRessources?:ImageComponent[],
	authorId?:string,
	getAuthor?:AuthorModel,
	comments?:CommentModel[],
	relatedArticles?:ArticleModel[],
	index?:string,
	viewsCount?:number
}

export type AuthorModel = {
	__typename?: "AuthorModel",
	_id:string,
	organisationId?:string,
	createdBy:string,
	updatedBy:string,
	deletedBy:string,
	createdAt:DateTime,
	updatedAt:DateTime,
	r:string[],
	w:string[],
	d:string[],
	types:AccountTypeEnum[],
	organisationIds?:string[],
	email:string,
	userName?:string,
	firstName:string,
	lastName:string,
	profilePicture:ImageComponent,
	phoneNumber?:string,
	gender?:AccountGenderEnum,
	birthDate?:DateTime,
	age?:number,
	address?:AddressComponent,
	language?:AvailableLanguage,
	bio?:TranslatableComponent
}

export enum AvailableLanguage {
	en = "en",
	fr = "fr",
	nl = "nl"
}

export type CategoryModel = {
	__typename?: "CategoryModel",
	_id:string,
	organisationId?:string,
	createdBy:string,
	updatedBy:string,
	deletedBy:string,
	createdAt:DateTime,
	updatedAt:DateTime,
	r:string[],
	w:string[],
	d:string[],
	title:TranslatableComponent,
	teaser?:TranslatableComponent,
	cover?:ImageComponent,
	thumbnail?:ImageComponent,
	extraImages?:ImageComponent[],
	content?:TranslatableComponent,
	seo?:SEOField,
	urls?:TranslatableComponent,
	ressourceType:RessourceEnum,
	colorCode?:string
}

export type CommentModel = {
	__typename?: "CommentModel",
	_id:string,
	organisationId?:string,
	createdBy:string,
	updatedBy:string,
	deletedBy:string,
	createdAt:DateTime,
	updatedAt:DateTime,
	r:string[],
	w:string[],
	d:string[],
	ressourceModel:CommentModelEnum,
	ressourceId:string,
	comment:string,
	edited:boolean,
	deleted:boolean,
	file?:ImageComponent,
	sentBy:string,
	parentId?:string,
	numberReplies?:number,
	replies?:CommentModel[]
}

export enum CommentModelEnum {
	ArticleModel = "ArticleModel"
}

/** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
export type DateTime = any

export type EditAccountInput = {
		userName?:string,
	firstName?:string,
	lastName?:string,
	profilePicture?:ImageInput,
	phoneNumber?:string,
	gender?:AccountGenderEnum,
	birthDate?:DateTime,
	address?:AddressInput,
	language?:AvailableLanguage,
	postCode?:number
}

export type EmailConfirmationData = {
	__typename?: "EmailConfirmationData",
	MJ_templateId:string
}

export type FieldSchema = {
	__typename?: "FieldSchema",
	required:boolean,
	type:FieldType,
	list?:JSONObject[]
}

export enum FieldType {
	string = "string",
	email = "email",
	number = "number",
	radio = "radio",
	select = "select",
	textarea = "textarea",
	checkbox = "checkbox"
}

export type FirebaseTokenResult = {
	__typename?: "FirebaseTokenResult",
	localId:string,
	email?:string,
	displayName?:string,
	idToken:string,
	registered?:boolean,
	refreshToken:string,
	expiresIn:string
}

export type FormData = {
	__typename?: "FormData",
	title:string,
	label?:TranslatableComponent,
	placeholder?:TranslatableComponent,
	schema:FieldSchema,
	position?:number
}

export type FormModel = {
	__typename?: "FormModel",
	_id:string,
	organisationId?:string,
	createdBy:string,
	updatedBy:string,
	deletedBy:string,
	createdAt:DateTime,
	updatedAt:DateTime,
	r:string[],
	w:string[],
	d:string[],
	title:string,
	formData:FormData[],
	emailConfirmationData?:EmailConfirmationData,
	marketingData?:MarketingData
}

export type FormSubmissionModel = {
	__typename?: "FormSubmissionModel",
	_id:string,
	organisationId?:string,
	createdBy:string,
	updatedBy:string,
	deletedBy:string,
	createdAt:DateTime,
	updatedAt:DateTime,
	r:string[],
	w:string[],
	d:string[],
	formId:string,
	formData:JSONObject
}

export type GetArgs = {
		limit:number,
	skip:number,
	sort?:string
}

export type ImageComponent = {
	__typename?: "ImageComponent",
	large:string,
	medium?:string,
	small?:string
}

export type ImageInput = {
		large:string,
	medium?:string,
	small?:string
}

/** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
export type JSONObject = any

export type LinkEmailInput = {
		email:string,
	password:string,
	idToken:string
}

export enum ListEnum {
	products = "products",
	articles = "articles",
	events = "events"
}

export type ListModel = {
	__typename?: "ListModel",
	_id:string,
	organisationId?:string,
	createdBy:string,
	updatedBy:string,
	deletedBy:string,
	createdAt:DateTime,
	updatedAt:DateTime,
	r:string[],
	w:string[],
	d:string[],
	title:TranslatableComponent,
	teaser?:TranslatableComponent,
	cover?:ImageComponent,
	thumbnail?:ImageComponent,
	extraImages?:ImageComponent[],
	content?:TranslatableComponent,
	seo?:SEOField,
	urls?:TranslatableComponent,
	ressourceType:ListEnum,
	colorCode?:string
}

export type LoginInput = {
		email:string,
	password:string
}

export type MarketingData = {
	__typename?: "MarketingData",
	AC_listId:string
}

export type Mutation = {
	__typename?: "Mutation",
	updateMe:AccountModel,
	updateMeEmail:AccountModel,
	updateMePassword:AccountModel,
	resetPassword:SimpleResult,
	registerGuest:AccountModel,
	formsSubmitOne:FormSubmissionModel
}

export type NewEmailInput = {
		newEmail:string
}

export type NewFormSubmissionInput = {
		formData:JSONObject
}

export type NewPasswordInput = {
		newPassword:string,
	newPasswordConfirmation:string
}

export type PageModel = {
	__typename?: "PageModel",
	_id:string,
	organisationId?:string,
	createdBy:string,
	updatedBy:string,
	deletedBy:string,
	createdAt:DateTime,
	updatedAt:DateTime,
	r:string[],
	w:string[],
	d:string[],
	title:string,
	label?:string,
	content?:JSONObject,
	position?:number,
	toComplete?:boolean
}

export type Query = {
	__typename?: "Query",
	me:AccountModel,
	login:FirebaseTokenResult,
	formsGetOne:FormModel,
	articlesGetOne:ArticleModel,
	articlesGetOneByUrl:ArticleModel,
	articlesGetMany:ArticleModel[],
	articlesGetManyForMembers:ArticleModel[],
	categoriesGetOne:CategoryModel,
	categoriesGetMany:CategoryModel[],
	categoriesGetCount:number,
	pagesGetOne:PageModel,
	pagesGetMany:PageModel[],
	pagesGetCount:number,
	listsGetOne:ListModel,
	listsGetMany:ListModel[],
	listsGetCount:number
}

export type ResetPasswordInput = {
		email:string
}

export enum RessourceEnum {
	products = "products",
	articles = "articles",
	events = "events"
}

export type SEOField = {
	__typename?: "SEOField",
	title:TranslatableComponent,
	description:TranslatableComponent,
	keywords:TranslatableComponent,
	thumbnail?:ImageComponent
}

export type SimpleResult = {
	__typename?: "SimpleResult",
	message:string
}

export type TranslatableComponent = {
	__typename?: "TranslatableComponent",
	en:string
}

export const AllTypesProps: Record<string,any> = {
	AccountGenderEnum: "enum",
	AccountTypeEnum: "enum",
	AddressInput:{
		number:{
			type:"String",
			array:false,
			arrayRequired:false,
			required:false
		},
		street:{
			type:"String",
			array:false,
			arrayRequired:false,
			required:false
		},
		streetBis:{
			type:"String",
			array:false,
			arrayRequired:false,
			required:false
		},
		floor:{
			type:"String",
			array:false,
			arrayRequired:false,
			required:false
		},
		box:{
			type:"String",
			array:false,
			arrayRequired:false,
			required:false
		},
		zip:{
			type:"String",
			array:false,
			arrayRequired:false,
			required:false
		},
		state:{
			type:"String",
			array:false,
			arrayRequired:false,
			required:false
		},
		city:{
			type:"String",
			array:false,
			arrayRequired:false,
			required:true
		},
		country:{
			type:"String",
			array:false,
			arrayRequired:false,
			required:true
		}
	},
	ArticleModel:{
		comments:{
			pagination:{
				type:"GetArgs",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		relatedArticles:{
			_ids:{
				type:"String",
				array:true,
				arrayRequired:false,
				required:true
			},
			search:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			afterCreatedAt:{
				type:"DateTime",
				array:false,
				arrayRequired:false,
				required:false
			},
			afterUpdatedAt:{
				type:"DateTime",
				array:false,
				arrayRequired:false,
				required:false
			},
			pagination:{
				type:"GetArgs",
				array:false,
				arrayRequired:false,
				required:false
			},
			categories:{
				type:"String",
				array:true,
				arrayRequired:false,
				required:true
			}
		}
	},
	AvailableLanguage: "enum",
	CommentModelEnum: "enum",
	DateTime: "String",
	EditAccountInput:{
		userName:{
			type:"String",
			array:false,
			arrayRequired:false,
			required:false
		},
		firstName:{
			type:"String",
			array:false,
			arrayRequired:false,
			required:false
		},
		lastName:{
			type:"String",
			array:false,
			arrayRequired:false,
			required:false
		},
		profilePicture:{
			type:"ImageInput",
			array:false,
			arrayRequired:false,
			required:false
		},
		phoneNumber:{
			type:"String",
			array:false,
			arrayRequired:false,
			required:false
		},
		gender:{
			type:"AccountGenderEnum",
			array:false,
			arrayRequired:false,
			required:false
		},
		birthDate:{
			type:"DateTime",
			array:false,
			arrayRequired:false,
			required:false
		},
		address:{
			type:"AddressInput",
			array:false,
			arrayRequired:false,
			required:false
		},
		language:{
			type:"AvailableLanguage",
			array:false,
			arrayRequired:false,
			required:false
		},
		postCode:{
			type:"Int",
			array:false,
			arrayRequired:false,
			required:false
		}
	},
	FieldType: "enum",
	GetArgs:{
		limit:{
			type:"Int",
			array:false,
			arrayRequired:false,
			required:true
		},
		skip:{
			type:"Int",
			array:false,
			arrayRequired:false,
			required:true
		},
		sort:{
			type:"String",
			array:false,
			arrayRequired:false,
			required:false
		}
	},
	ImageInput:{
		large:{
			type:"String",
			array:false,
			arrayRequired:false,
			required:true
		},
		medium:{
			type:"String",
			array:false,
			arrayRequired:false,
			required:false
		},
		small:{
			type:"String",
			array:false,
			arrayRequired:false,
			required:false
		}
	},
	JSONObject: "String",
	LinkEmailInput:{
		email:{
			type:"String",
			array:false,
			arrayRequired:false,
			required:true
		},
		password:{
			type:"String",
			array:false,
			arrayRequired:false,
			required:true
		},
		idToken:{
			type:"String",
			array:false,
			arrayRequired:false,
			required:true
		}
	},
	ListEnum: "enum",
	LoginInput:{
		email:{
			type:"String",
			array:false,
			arrayRequired:false,
			required:true
		},
		password:{
			type:"String",
			array:false,
			arrayRequired:false,
			required:true
		}
	},
	Mutation:{
		updateMe:{
			input:{
				type:"EditAccountInput",
				array:false,
				arrayRequired:false,
				required:true
			}
		},
		updateMeEmail:{
			input:{
				type:"NewEmailInput",
				array:false,
				arrayRequired:false,
				required:true
			}
		},
		updateMePassword:{
			input:{
				type:"NewPasswordInput",
				array:false,
				arrayRequired:false,
				required:true
			}
		},
		resetPassword:{
			input:{
				type:"ResetPasswordInput",
				array:false,
				arrayRequired:false,
				required:true
			}
		},
		registerGuest:{
			otherInfo:{
				type:"EditAccountInput",
				array:false,
				arrayRequired:false,
				required:true
			},
			input:{
				type:"LinkEmailInput",
				array:false,
				arrayRequired:false,
				required:true
			}
		},
		formsSubmitOne:{
			input:{
				type:"NewFormSubmissionInput",
				array:false,
				arrayRequired:false,
				required:true
			},
			id:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:true
			}
		}
	},
	NewEmailInput:{
		newEmail:{
			type:"String",
			array:false,
			arrayRequired:false,
			required:true
		}
	},
	NewFormSubmissionInput:{
		formData:{
			type:"JSONObject",
			array:false,
			arrayRequired:false,
			required:true
		}
	},
	NewPasswordInput:{
		newPassword:{
			type:"String",
			array:false,
			arrayRequired:false,
			required:true
		},
		newPasswordConfirmation:{
			type:"String",
			array:false,
			arrayRequired:false,
			required:true
		}
	},
	Query:{
		login:{
			refreshToken:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			creds:{
				type:"LoginInput",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		formsGetOne:{
			id:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:true
			}
		},
		articlesGetOne:{
			id:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:true
			}
		},
		articlesGetOneByUrl:{
			url:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:true
			},
			language:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:true
			}
		},
		articlesGetMany:{
			_ids:{
				type:"String",
				array:true,
				arrayRequired:false,
				required:true
			},
			search:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			afterCreatedAt:{
				type:"DateTime",
				array:false,
				arrayRequired:false,
				required:false
			},
			afterUpdatedAt:{
				type:"DateTime",
				array:false,
				arrayRequired:false,
				required:false
			},
			pagination:{
				type:"GetArgs",
				array:false,
				arrayRequired:false,
				required:false
			},
			categories:{
				type:"String",
				array:true,
				arrayRequired:false,
				required:true
			}
		},
		articlesGetManyForMembers:{
			_ids:{
				type:"String",
				array:true,
				arrayRequired:false,
				required:true
			},
			search:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			afterCreatedAt:{
				type:"DateTime",
				array:false,
				arrayRequired:false,
				required:false
			},
			afterUpdatedAt:{
				type:"DateTime",
				array:false,
				arrayRequired:false,
				required:false
			},
			pagination:{
				type:"GetArgs",
				array:false,
				arrayRequired:false,
				required:false
			},
			categories:{
				type:"String",
				array:true,
				arrayRequired:false,
				required:true
			}
		},
		categoriesGetOne:{
			id:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:true
			}
		},
		categoriesGetMany:{
			search:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			ressourceType:{
				type:"RessourceEnum",
				array:false,
				arrayRequired:false,
				required:true
			},
			pagination:{
				type:"GetArgs",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		categoriesGetCount:{
			search:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			ressourceType:{
				type:"RessourceEnum",
				array:false,
				arrayRequired:false,
				required:true
			},
			pagination:{
				type:"GetArgs",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		pagesGetOne:{
			id:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:true
			}
		},
		pagesGetMany:{
			pagination:{
				type:"GetArgs",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		pagesGetCount:{
			pagination:{
				type:"GetArgs",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		listsGetOne:{
			id:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:true
			}
		},
		listsGetMany:{
			search:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			ressourceType:{
				type:"RessourceEnum",
				array:false,
				arrayRequired:false,
				required:true
			},
			pagination:{
				type:"GetArgs",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		listsGetCount:{
			search:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			ressourceType:{
				type:"RessourceEnum",
				array:false,
				arrayRequired:false,
				required:true
			},
			pagination:{
				type:"GetArgs",
				array:false,
				arrayRequired:false,
				required:false
			}
		}
	},
	ResetPasswordInput:{
		email:{
			type:"String",
			array:false,
			arrayRequired:false,
			required:true
		}
	},
	RessourceEnum: "enum"
}

export const ReturnTypes: Record<string,any> = {
	AccountModel:{
		_id:"ID",
		organisationId:"ID",
		createdBy:"ID",
		updatedBy:"ID",
		deletedBy:"ID",
		createdAt:"DateTime",
		updatedAt:"DateTime",
		r:"String",
		w:"String",
		d:"String",
		types:"AccountTypeEnum",
		organisationIds:"String",
		email:"String",
		userName:"String",
		firstName:"String",
		lastName:"String",
		profilePicture:"ImageComponent",
		phoneNumber:"String",
		gender:"AccountGenderEnum",
		birthDate:"DateTime",
		age:"Int",
		address:"AddressComponent",
		language:"AvailableLanguage",
		postCode:"Int"
	},
	AddressComponent:{
		number:"String",
		street:"String",
		streetBis:"String",
		floor:"String",
		box:"String",
		zip:"String",
		state:"String",
		city:"String",
		country:"String"
	},
	ArticleModel:{
		_id:"ID",
		organisationId:"ID",
		createdBy:"ID",
		updatedBy:"ID",
		deletedBy:"ID",
		createdAt:"DateTime",
		updatedAt:"DateTime",
		r:"String",
		w:"String",
		d:"String",
		title:"TranslatableComponent",
		teaser:"TranslatableComponent",
		cover:"ImageComponent",
		thumbnail:"ImageComponent",
		extraImages:"ImageComponent",
		content:"TranslatableComponent",
		seo:"SEOField",
		urls:"TranslatableComponent",
		published:"Boolean",
		publicationDate:"DateTime",
		private:"Boolean",
		categoryIds:"String",
		getCategories:"CategoryModel",
		downloadableRessources:"ImageComponent",
		authorId:"String",
		getAuthor:"AuthorModel",
		comments:"CommentModel",
		relatedArticles:"ArticleModel",
		index:"String",
		viewsCount:"Int"
	},
	AuthorModel:{
		_id:"ID",
		organisationId:"ID",
		createdBy:"ID",
		updatedBy:"ID",
		deletedBy:"ID",
		createdAt:"DateTime",
		updatedAt:"DateTime",
		r:"String",
		w:"String",
		d:"String",
		types:"AccountTypeEnum",
		organisationIds:"String",
		email:"String",
		userName:"String",
		firstName:"String",
		lastName:"String",
		profilePicture:"ImageComponent",
		phoneNumber:"String",
		gender:"AccountGenderEnum",
		birthDate:"DateTime",
		age:"Int",
		address:"AddressComponent",
		language:"AvailableLanguage",
		bio:"TranslatableComponent"
	},
	CategoryModel:{
		_id:"ID",
		organisationId:"ID",
		createdBy:"ID",
		updatedBy:"ID",
		deletedBy:"ID",
		createdAt:"DateTime",
		updatedAt:"DateTime",
		r:"String",
		w:"String",
		d:"String",
		title:"TranslatableComponent",
		teaser:"TranslatableComponent",
		cover:"ImageComponent",
		thumbnail:"ImageComponent",
		extraImages:"ImageComponent",
		content:"TranslatableComponent",
		seo:"SEOField",
		urls:"TranslatableComponent",
		ressourceType:"RessourceEnum",
		colorCode:"String"
	},
	CommentModel:{
		_id:"ID",
		organisationId:"ID",
		createdBy:"ID",
		updatedBy:"ID",
		deletedBy:"ID",
		createdAt:"DateTime",
		updatedAt:"DateTime",
		r:"String",
		w:"String",
		d:"String",
		ressourceModel:"CommentModelEnum",
		ressourceId:"String",
		comment:"String",
		edited:"Boolean",
		deleted:"Boolean",
		file:"ImageComponent",
		sentBy:"String",
		parentId:"String",
		numberReplies:"Int",
		replies:"CommentModel"
	},
	EmailConfirmationData:{
		MJ_templateId:"String"
	},
	FieldSchema:{
		required:"Boolean",
		type:"FieldType",
		list:"JSONObject"
	},
	FirebaseTokenResult:{
		localId:"String",
		email:"String",
		displayName:"String",
		idToken:"String",
		registered:"Boolean",
		refreshToken:"String",
		expiresIn:"String"
	},
	FormData:{
		title:"String",
		label:"TranslatableComponent",
		placeholder:"TranslatableComponent",
		schema:"FieldSchema",
		position:"Int"
	},
	FormModel:{
		_id:"ID",
		organisationId:"ID",
		createdBy:"ID",
		updatedBy:"ID",
		deletedBy:"ID",
		createdAt:"DateTime",
		updatedAt:"DateTime",
		r:"String",
		w:"String",
		d:"String",
		title:"String",
		formData:"FormData",
		emailConfirmationData:"EmailConfirmationData",
		marketingData:"MarketingData"
	},
	FormSubmissionModel:{
		_id:"ID",
		organisationId:"ID",
		createdBy:"ID",
		updatedBy:"ID",
		deletedBy:"ID",
		createdAt:"DateTime",
		updatedAt:"DateTime",
		r:"String",
		w:"String",
		d:"String",
		formId:"String",
		formData:"JSONObject"
	},
	ImageComponent:{
		large:"String",
		medium:"String",
		small:"String"
	},
	ListModel:{
		_id:"ID",
		organisationId:"ID",
		createdBy:"ID",
		updatedBy:"ID",
		deletedBy:"ID",
		createdAt:"DateTime",
		updatedAt:"DateTime",
		r:"String",
		w:"String",
		d:"String",
		title:"TranslatableComponent",
		teaser:"TranslatableComponent",
		cover:"ImageComponent",
		thumbnail:"ImageComponent",
		extraImages:"ImageComponent",
		content:"TranslatableComponent",
		seo:"SEOField",
		urls:"TranslatableComponent",
		ressourceType:"ListEnum",
		colorCode:"String"
	},
	MarketingData:{
		AC_listId:"String"
	},
	Mutation:{
		updateMe:"AccountModel",
		updateMeEmail:"AccountModel",
		updateMePassword:"AccountModel",
		resetPassword:"SimpleResult",
		registerGuest:"AccountModel",
		formsSubmitOne:"FormSubmissionModel"
	},
	PageModel:{
		_id:"ID",
		organisationId:"ID",
		createdBy:"ID",
		updatedBy:"ID",
		deletedBy:"ID",
		createdAt:"DateTime",
		updatedAt:"DateTime",
		r:"String",
		w:"String",
		d:"String",
		title:"String",
		label:"String",
		content:"JSONObject",
		position:"Int",
		toComplete:"Boolean"
	},
	Query:{
		me:"AccountModel",
		login:"FirebaseTokenResult",
		formsGetOne:"FormModel",
		articlesGetOne:"ArticleModel",
		articlesGetOneByUrl:"ArticleModel",
		articlesGetMany:"ArticleModel",
		articlesGetManyForMembers:"ArticleModel",
		categoriesGetOne:"CategoryModel",
		categoriesGetMany:"CategoryModel",
		categoriesGetCount:"Float",
		pagesGetOne:"PageModel",
		pagesGetMany:"PageModel",
		pagesGetCount:"Float",
		listsGetOne:"ListModel",
		listsGetMany:"ListModel",
		listsGetCount:"Float"
	},
	SEOField:{
		title:"TranslatableComponent",
		description:"TranslatableComponent",
		keywords:"TranslatableComponent",
		thumbnail:"ImageComponent"
	},
	SimpleResult:{
		message:"String"
	},
	TranslatableComponent:{
		en:"String"
	}
}

export class GraphQLError extends Error {
    constructor(public response: GraphQLResponse) {
      super("");
      console.error(response);
    }
    toString() {
      return "GraphQL Response Error";
    }
  }


type Func<P extends any[], R> = (...args: P) => R;
type AnyFunc = Func<any, any>;

type WithTypeNameValue<T> = T & {
  __typename?: true;
};

type AliasType<T> = WithTypeNameValue<T> & {
  __alias?: Record<string, WithTypeNameValue<T>>;
};

type NotUndefined<T> = T extends undefined ? never : T;

export type ResolverType<F> = NotUndefined<F extends [infer ARGS, any] ? ARGS : undefined>;

export type ArgsType<F extends AnyFunc> = F extends Func<infer P, any> ? P : never;

interface GraphQLResponse {
  data?: Record<string, any>;
  errors?: Array<{
    message: string;
  }>;
}
export type MapInterface<SRC, DST> = SRC extends {
  __interface: infer INTERFACE;
  __resolve: infer IMPLEMENTORS;
}
  ? ObjectToUnion<
      Omit<
        {
          [Key in keyof Omit<DST, keyof INTERFACE | '__typename'>]: Key extends keyof IMPLEMENTORS
            ? MapType<IMPLEMENTORS[Key], DST[Key]> &
                Omit<
                  {
                    [Key in keyof Omit<
                      DST,
                      keyof IMPLEMENTORS | '__typename'
                    >]: Key extends keyof INTERFACE
                      ? LastMapTypeSRCResolver<INTERFACE[Key], DST[Key]>
                      : never;
                  },
                  keyof IMPLEMENTORS
                > &
                (DST extends { __typename: any }
                  ? MapType<IMPLEMENTORS[Key], { __typename: true }>
                  : {})
            : never;
        },
        keyof INTERFACE | '__typename'
      >
    >
  : never;

export type ValueToUnion<T> = T extends {
  __typename: infer R;
}
  ? {
      [P in keyof Omit<T, '__typename'>]: T[P] & {
        __typename: R;
      };
    }
  : T;

export type ObjectToUnion<T> = {
  [P in keyof T]: T[P];
}[keyof T];

type Anify<T> = { [P in keyof T]?: any };


type LastMapTypeSRCResolver<SRC, DST> = SRC extends undefined
  ? undefined
  : SRC extends Array<infer AR>
  ? LastMapTypeSRCResolver<AR, DST>[]
  : SRC extends { __interface: any; __resolve: any }
  ? MapInterface<SRC, DST>
  : SRC extends { __union: any; __resolve: infer RESOLVE }
  ? ObjectToUnion<MapType<RESOLVE, ValueToUnion<DST>>>
  : DST extends boolean
  ? SRC
  : MapType<SRC, DST>;

type MapType<SRC extends Anify<DST>, DST> = DST extends boolean
  ? SRC
  : DST extends {
      __alias: any;
    }
  ? {
      [A in keyof DST["__alias"]]: Required<SRC> extends Anify<
        DST["__alias"][A]
      >
        ? MapType<Required<SRC>, DST["__alias"][A]>
        : never;
    } &
      {
        [Key in keyof Omit<DST, "__alias">]: DST[Key] extends [
          any,
          infer PAYLOAD
        ]
          ? LastMapTypeSRCResolver<SRC[Key], PAYLOAD>
          : LastMapTypeSRCResolver<SRC[Key], DST[Key]>;
      }
  : {
      [Key in keyof DST]: DST[Key] extends [any, infer PAYLOAD]
        ? LastMapTypeSRCResolver<SRC[Key], PAYLOAD>
        : LastMapTypeSRCResolver<SRC[Key], DST[Key]>;
    };

type OperationToGraphQL<V, T> = <Z extends V>(o: Z | V, variables?: Record<string, any>) => Promise<MapType<T, Z>>;

type CastToGraphQL<V, T> = (
  resultOfYourQuery: any
) => <Z extends V>(o: Z | V) => MapType<T, Z>;

type fetchOptions = ArgsType<typeof fetch>;

export type SelectionFunction<V> = <T>(t: T | V) => T;
type FetchFunction = (query: string, variables?: Record<string, any>) => any;



export const ZeusSelect = <T>() => ((t: any) => t) as SelectionFunction<T>;
export const ScalarResolver = (scalar: string, value: any) => {
  switch (scalar) {
    case 'String':
      return  `"${value.replace(/"/g, '\\\"')}"`;
    case 'Int':
      return `${value}`;
    case 'Float':
      return `${value}`;
    case 'Boolean':
      return `${value}`;
    case 'ID':
      return `"${value}"`;
    case 'enum':
      return `${value}`;
    case 'scalar':
      return `${value}`;
    default:
      return false;
  }
};

export const TypesPropsResolver = ({
  value,
  type,
  name,
  key,
  blockArrays
}: {
  value: any;
  type: string;
  name: string;
  key?: string;
  blockArrays?: boolean;
}): string => {
  if (value === null) {
    return `null`;
  }
  let resolvedValue = AllTypesProps[type][name];
  if (key) {
    resolvedValue = resolvedValue[key];
  }
  if (!resolvedValue) {
    throw new Error(`Cannot resolve ${type} ${name}${key ? ` ${key}` : ''}`)
  }
  const typeResolved = resolvedValue.type;
  const isArray: boolean = resolvedValue.array;
  if (typeof value === 'string' && value.startsWith(`ZEUS_VAR$`)) {
    const isRequired = resolvedValue.required ? '!' : ''
    return `\$${value.split(`ZEUS_VAR$`)[1]}__ZEUS_VAR__${typeResolved}${isRequired}`;
  }
  if (isArray && !blockArrays) {
    return `[${value
      .map((v: any) => TypesPropsResolver({ value: v, type, name, key, blockArrays: true }))
      .join(',')}]`;
  }
  const reslovedScalar = ScalarResolver(typeResolved, value);
  if (!reslovedScalar) {
    const resolvedType = AllTypesProps[typeResolved];
    if (typeof resolvedType === 'object') {
      const argsKeys = Object.keys(resolvedType);
      return `{${argsKeys
        .filter((ak) => value[ak] !== undefined)
        .map(
          (ak) => `${ak}:${TypesPropsResolver({ value: value[ak], type: typeResolved, name: ak })}`
        )}}`;
    }
    return ScalarResolver(AllTypesProps[typeResolved], value) as string;
  }
  return reslovedScalar;
};

const isArrayFunction = (
  parent: string[],
  a: any[]
) => {
  const [values, r] = a;
  const [mainKey, key, ...keys] = parent;
  const keyValues = Object.keys(values);

  if (!keys.length) {
      return keyValues.length > 0
        ? `(${keyValues
            .map(
              (v) =>
                `${v}:${TypesPropsResolver({
                  value: values[v],
                  type: mainKey,
                  name: key,
                  key: v
                })}`
            )
            .join(',')})${r ? traverseToSeekArrays(parent, r) : ''}`
        : traverseToSeekArrays(parent, r);
    }

  const [typeResolverKey] = keys.splice(keys.length - 1, 1);
  let valueToResolve = ReturnTypes[mainKey][key];
  for (const k of keys) {
    valueToResolve = ReturnTypes[valueToResolve][k];
  }

  const argumentString =
    keyValues.length > 0
      ? `(${keyValues
          .map(
            (v) =>
              `${v}:${TypesPropsResolver({
                value: values[v],
                type: valueToResolve,
                name: typeResolverKey,
                key: v
              })}`
          )
          .join(',')})${r ? traverseToSeekArrays(parent, r) : ''}`
      : traverseToSeekArrays(parent, r);
  return argumentString;
};

const resolveKV = (k: string, v: boolean | string | { [x: string]: boolean | string }) =>
  typeof v === 'boolean' ? k : typeof v === 'object' ? `${k}{${objectToTree(v)}}` : `${k}${v}`;

const objectToTree = (o: { [x: string]: boolean | string }): string =>
  `{${Object.keys(o).map((k) => `${resolveKV(k, o[k])}`).join(' ')}}`;

const traverseToSeekArrays = (parent: string[], a?: any): string => {
  if (!a) return '';
  if (Object.keys(a).length === 0) {
    return '';
  }
  let b: Record<string, any> = {};
  if (Array.isArray(a)) {
    return isArrayFunction([...parent], a);
  } else {
    if (typeof a === 'object') {
      Object.keys(a).map((k) => {
        if (k === '__alias') {
          Object.keys(a[k]).map((aliasKey) => {
            const aliasOperations = a[k][aliasKey];
            const aliasOperationName = Object.keys(aliasOperations)[0];
            const aliasOperation = aliasOperations[aliasOperationName];
            b[
              `${aliasOperationName}__alias__${aliasKey}: ${aliasOperationName}`
            ] = traverseToSeekArrays([...parent, aliasOperationName], aliasOperation);
          });
        } else {
          b[k] = traverseToSeekArrays([...parent, k], a[k]);
        }
      });
    } else {
      return '';
    }
  }
  return objectToTree(b);
};

const buildQuery = (type: string, a?: Record<any, any>) => traverseToSeekArrays([type], a);

const inspectVariables = (query: string) => {
  const regex = /\$\b\w*ZEUS_VAR\w*\b[!]?/g;
  let result;
  const AllVariables = [];
  while ((result = regex.exec(query))) {
    AllVariables.push(result[0]);
  }
  if (!AllVariables.length) {
    return query;
  }
  let filteredQuery = query;
  AllVariables.forEach((variable) => {
    filteredQuery = filteredQuery.replace(variable, variable.split('__ZEUS_VAR__')[0]);
  });
  return `(${AllVariables.map((a) => a.split('__ZEUS_VAR__'))
    .map(([variableName, variableType]) => `${variableName}:${variableType}`)
    .join(', ')})${filteredQuery}`;
};

const queryConstruct = (t: 'query' | 'mutation' | 'subscription', tName: string) => (o: Record<any, any>) =>
  `${t.toLowerCase()}${inspectVariables(buildQuery(tName, o))}`;
  
const fullChainConstruct = (fn: FetchFunction) => (t: 'query' | 'mutation' | 'subscription', tName: string) => (
  o: Record<any, any>,
  variables?: Record<string, any>,
) => fn(queryConstruct(t, tName)(o), variables);

const seekForAliases = (o: any) => {
  if (typeof o === 'object' && o) {
    const keys = Object.keys(o);
    if (keys.length < 1) {
      return;
    }
    keys.forEach((k) => {
      const value = o[k];
      if (k.indexOf('__alias__') !== -1) {
        const [operation, alias] = k.split('__alias__');
        o[alias] = {
          [operation]: value
        };
        delete o[k];
      } else {
        if (Array.isArray(value)) {
          value.forEach(seekForAliases);
        } else {
          if (typeof value === 'object') {
            seekForAliases(value);
          }
        }
      }
    });
  }
};

export const $ = (t: TemplateStringsArray): any => `ZEUS_VAR$${t.join('')}`;


const handleFetchResponse = (
  response: Parameters<Extract<Parameters<ReturnType<typeof fetch>['then']>[0], Function>>[0]
): Promise<GraphQLResponse> => {
  if (!response.ok) {
    return new Promise((resolve, reject) => {
      response.text().then(text => {
        try { reject(JSON.parse(text)); }
        catch (err) { reject(text); }
      }).catch(reject);
    });
  }
  return response.json();
};

const apiFetch = (options: fetchOptions) => (query: string, variables: Record<string, any> = {}) => {
    let fetchFunction = fetch;
    let queryString = query;
    let fetchOptions = options[1] || {};
    if (fetchOptions.method && fetchOptions.method === 'GET') {
      queryString = encodeURIComponent(query);
      return fetchFunction(`${options[0]}?query=${queryString}`, fetchOptions)
        .then(handleFetchResponse)
        .then((response: GraphQLResponse) => {
          if (response.errors) {
            throw new GraphQLError(response);
          }
          seekForAliases(response.data);
          return response.data;
        });
    }
    return fetchFunction(`${options[0]}`, {
      body: JSON.stringify({ query: queryString, variables }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      ...fetchOptions
    })
      .then(handleFetchResponse)
      .then((response: GraphQLResponse) => {
        if (response.errors) {
          throw new GraphQLError(response);
        }
        seekForAliases(response.data);
        return response.data;
      });
  };
  


export const Thunder = (fn: FetchFunction) => ({
  query: ((o: any, variables) =>
    fullChainConstruct(fn)('query', 'Query')(o, variables).then(
      (response: any) => response
    )) as OperationToGraphQL<ValueTypes["Query"],Query>,
mutation: ((o: any, variables) =>
    fullChainConstruct(fn)('mutation', 'Mutation')(o, variables).then(
      (response: any) => response
    )) as OperationToGraphQL<ValueTypes["Mutation"],Mutation>
});

export const Chain = (...options: fetchOptions) => ({
  query: ((o: any, variables) =>
    fullChainConstruct(apiFetch(options))('query', 'Query')(o, variables).then(
      (response: any) => response
    )) as OperationToGraphQL<ValueTypes["Query"],Query>,
mutation: ((o: any, variables) =>
    fullChainConstruct(apiFetch(options))('mutation', 'Mutation')(o, variables).then(
      (response: any) => response
    )) as OperationToGraphQL<ValueTypes["Mutation"],Mutation>
});
export const Zeus = {
  query: (o:ValueTypes["Query"]) => queryConstruct('query', 'Query')(o),
mutation: (o:ValueTypes["Mutation"]) => queryConstruct('mutation', 'Mutation')(o)
};
export const Cast = {
  query: ((o: any) => (b: any) => o) as CastToGraphQL<
  ValueTypes["Query"],
  Query
>,
mutation: ((o: any) => (b: any) => o) as CastToGraphQL<
  ValueTypes["Mutation"],
  Mutation
>
};
export const Selectors = {
  query: ZeusSelect<ValueTypes["Query"]>(),
mutation: ZeusSelect<ValueTypes["Mutation"]>()
};
  

export const Gql = Chain('https://gtm7160mbg.execute-api.eu-central-1.amazonaws.com/staging/')