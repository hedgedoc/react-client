/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import ISO from 'iso-639-1'
import React, { useCallback } from 'react'
import { Col, Modal, Row } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { ApplicationState } from '../../../redux'
import { replaceFrontmatterInMarkdownContentAction } from '../../../redux/note-details/methods'
import { CommonModal } from '../../common/modals/common-modal'
import { NoteType, RawNoteFrontmatter } from '../note-frontmatter/note-frontmatter'
import { BreaksMetadataInput } from './breaks-metadata-input'
import { DatalistMetadataInput } from './datalist-metadata-input'
import { InputLabel } from './input-label'
import { StringMetadataInput } from './string-metadata-input'
import { StringMetadataTextarea } from './string-metadata-textarea'
import { TagsMetadataInput } from './tags-metadata-input'
import { TextDirectionMetadataInput } from './text-direction-metadata-input'

export interface MetadataEditorProps {
  show: boolean,
  onHide: () => void
}

export interface MetadataInputFieldProps<T> {
  content: T
  frontmatterKey: keyof RawNoteFrontmatter
  onContentChange: (frontmatter: RawNoteFrontmatter) => void
}

export interface SelectMetadataOptions<T> {
  options: T[]
}

export const MetadataEditor: React.FC<MetadataEditorProps> = ({ show, onHide }) => {
  const { t } = useTranslation()
  const yamlMetadata = useSelector((state: ApplicationState) => state.noteDetails.frontmatter)
  /*const [yamlMetadata, setNoteFrontmatter] = useState<Omit<YAMLMetaData, 'opengraph'>>({
   title: "Test Title",
   description: "Test Description\nwith two lines",
   tags: ["tag1", "tag2"],
   robots: "",
   lang: "de-at",
   dir: TextDirection.LTR,
   breaks: false,
   GA: "test GA string",
   disqus: "test disqus string",
   type: '',
   deprecatedTagsSyntax: false
   })*/

  const updateFrontmatter = useCallback((frontmatter: RawNoteFrontmatter): void => {
    replaceFrontmatterInMarkdownContentAction(frontmatter)
  }, [])

  return (
    <CommonModal
      size='lg'
      show={ show }
      onHide={ onHide }
      closeButton={ true }
      titleI18nKey={ 'editor.modal.metadataEditor.title' }>
      <Modal.Body>
        <Row>
          <Col lg={ 6 }>
            <InputLabel id={ 'title' } label={ t('editor.modal.metadataEditor.labels.title') }>
              <StringMetadataInput frontmatterKey={ 'title' } content={ yamlMetadata.title }
                                   onContentChange={ updateFrontmatter }/>
            </InputLabel>
            <InputLabel id={ 'type' } label={ t('editor.modal.metadataEditor.labels.type') }>
              <DatalistMetadataInput frontmatterKey={ 'type' } options={ Object.values(NoteType) }
                                     content={ yamlMetadata.type }
                                     onContentChange={ updateFrontmatter }/>
            </InputLabel>
            <InputLabel id={ 'dir' } label={ t('editor.modal.metadataEditor.labels.dir') }>
              <TextDirectionMetadataInput frontmatterKey={ 'dir' } content={ yamlMetadata.dir }
                                          onContentChange={ updateFrontmatter }/>
            </InputLabel>
            <InputLabel id={ 'description' } label={ t('editor.modal.metadataEditor.labels.description') }>
              <StringMetadataTextarea frontmatterKey={ 'description' } content={ yamlMetadata.description }
                                      onContentChange={ updateFrontmatter }/>
            </InputLabel>
            <InputLabel id={ 'disqus' } label={ t('editor.modal.metadataEditor.labels.disqus') }>
              <StringMetadataInput frontmatterKey={ 'disqus' } content={ yamlMetadata.disqus }
                                   onContentChange={ updateFrontmatter }/>
            </InputLabel>
          </Col>
          <Col lg={ 6 }>
            <InputLabel id={ 'lang' } label={ t('editor.modal.metadataEditor.labels.lang') }>
              <DatalistMetadataInput frontmatterKey={ 'lang' } options={ ISO.getAllCodes() }
                                     content={ yamlMetadata.lang }
                                     onContentChange={ updateFrontmatter }/>
            </InputLabel>
            <InputLabel id={ 'robots' } label={ t('editor.modal.metadataEditor.labels.robots') }>
              <StringMetadataInput frontmatterKey={ 'robots' } content={ yamlMetadata.robots }
                                   onContentChange={ updateFrontmatter }/>
            </InputLabel>
            <InputLabel id={ 'breaks' } label={ t('editor.modal.metadataEditor.labels.breaks') }>
              <BreaksMetadataInput frontmatterKey={ 'breaks' } content={ yamlMetadata.breaks }
                                   onContentChange={ updateFrontmatter }/>
            </InputLabel>
            <InputLabel id={ 'tags' } label={ t('editor.modal.metadataEditor.labels.tags') }>
              <TagsMetadataInput frontmatterKey={ 'tags' } content={ yamlMetadata.tags }
                                 onContentChange={ updateFrontmatter }/>
            </InputLabel>
            <InputLabel id={ 'GA' } label={ t('editor.modal.metadataEditor.labels.GA') }>
              <StringMetadataInput frontmatterKey={ 'GA' } content={ yamlMetadata.GA }
                                   onContentChange={ updateFrontmatter }/>
            </InputLabel>
          </Col>
        </Row>
      </Modal.Body>
    </CommonModal>
  )
}
