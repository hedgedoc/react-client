/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { doApiDeleteRequest } from '../request-utils'
import type { ImageProxyRequestDto, ImageProxyResponse, MediaUpload } from './types'
import { doApiPostRequestWithJsonResponse } from '../request-utils/with-json-response'

/**
 * Requests an image-proxy URL from the backend for a given image URL.
 * @param imageUrl The image URL which should be proxied.
 * @return The proxy URL for the image.
 */
export const getProxiedUrl = async (imageUrl: string): Promise<ImageProxyResponse> => {
  return await doApiPostRequestWithJsonResponse<ImageProxyRequestDto, ImageProxyResponse>('media/proxy', {
    url: imageUrl
  })
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
  return doApiPostRequestWithJsonResponse<FormData, MediaUpload>('media', postData, {
    additionalRequestInit: {
      headers: {
        'Content-Type': 'multipart/form-data',
        'HedgeDoc-Note': noteIdOrAlias
      }
    }
  })
}

/**
 * Deletes some uploaded media object.
 * @param mediaId The identifier of the media object to delete.
 */
export const deleteUploadedMedia = (mediaId: string): Promise<unknown> => {
  return doApiDeleteRequest('media/' + mediaId)
}
