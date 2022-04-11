/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import type { ImageProxyRequestDto, ImageProxyResponse, MediaUpload } from './types'
import { ApiRequest } from '../common/api-request'

/**
 * Requests an image-proxy URL from the backend for a given image URL.
 * @param imageUrl The image URL which should be proxied.
 * @return The proxy URL for the image.
 */
export const getProxiedUrl = async (imageUrl: string): Promise<ImageProxyResponse> => {
  const response = await new ApiRequest('media/proxy')
    .withJsonBody<ImageProxyRequestDto>({
      url: imageUrl
    })
    .sendPostRequest()
  return response.getResponseJson<ImageProxyResponse>()
}

/**
 * Uploads a media file to the backend.
 * @param noteIdOrAlias The id or alias of the note from which the media is uploaded.
 * @param media The binary media content.
 * @return The URL of the uploaded media object.
 */
export const uploadFile = async (noteIdOrAlias: string, media: Blob): Promise<MediaUpload> => {
  const postData = new FormData()
  postData.append('file', media)
  const response = await new ApiRequest('media')
    .withHeader('Content-Type', 'multipart/form-data')
    .withHeader('HedgeDoc-Note', noteIdOrAlias)
    .withBody(postData)
    .sendPostRequest()
  return response.getResponseJson<MediaUpload>()
}

/**
 * Deletes some uploaded media object.
 * @param mediaId The identifier of the media object to delete.
 */
export const deleteUploadedMedia = async (mediaId: string): Promise<void> => {
  await new ApiRequest('media/' + mediaId).sendDeleteRequest()
}
