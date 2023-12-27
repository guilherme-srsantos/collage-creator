import axios from "axios";
import authData from "../types/authData";
import { Period, topTracksFilter } from "../types/topTracksFilter";
import LastFM, * as lastfmNjs from "lastfm-njs";
import * as _ from "lodash";
import {
	ErrorMessage,
	ErrorResponse,
	ResponseData,
	UserGetTopAlbums,
	UserGetTopAlbumsRes,
} from "lastfm-njs";

export class LastFmService {
	private lastfmClient: LastFM;

	constructor(authData: authData) {
		this.lastfmClient = new LastFM({
			apiKey: authData.APIKEY,
			apiSecret: authData.SECRET,
		});
	}

	async getLastTracks(userName: string) {}

	async getMostListenedAlbuns(params: topTracksFilter) {
		const request: UserGetTopAlbums = {
			user: params.user,
			limit: params.limit,
		};

		switch (params.period) {
			case Period.Overall:
				request.period = lastfmNjs.Period.OVERALL;
				break;
			case Period.OneWeek:
				request.period = lastfmNjs.Period.WEEK;
				break;
			case Period.OneMonth:
				request.period = lastfmNjs.Period.MONTH;
				break;
			case Period.SixMonths:
				request.period = lastfmNjs.Period.SIX_MONTH;
				break;
			case Period.TwelveMonths:
				request.period = lastfmNjs.Period.YEAR;
				break;

			default:
				request.period = lastfmNjs.Period.OVERALL;
				break;
		}
		const response = await this.lastfmClient.user_getTopAlbums(request);


		if (response.success) {
			const data: ResponseData<UserGetTopAlbumsRes> = response;

			data.album = _.sortBy(data.album, ["playcount"], ["desc"]);

			return data;
		}

		const data: ErrorMessage | ErrorResponse = response;

		throw new Error(
			`An error occurred while processing your request: ${data.error}`,
		);
	}
}
