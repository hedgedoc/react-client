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
import { setNoteFrontmatter } from '../../../redux/note-details/methods'
import { CommonModal } from '../../common/modals/common-modal'
import { NoteFrontmatter, NoteType } from '../note-frontmatter/note-frontmatter'
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
  id: string
  content: T
  onContentChange: (newContent: T) => void
}

export interface SelectMetadataOptions<T> {
  options: T[]
}

export const MetadataEditor: React.FC<MetadataEditorProps> = ({ show, onHide }) => {
  const { t } = useTranslation()
  const yamlMetadata = useSelector((state: ApplicationState) => state.noteDetails.frontmatter)
  const noteDetails = useSelector((state: ApplicationState) => state.noteDetails.markdownContent)
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

  const setMarkdown = useCallback((changes: Partial<NoteFrontmatter>) => {
    const newMetadata = Object.assign(yamlMetadata, changes)

//    setnoteDetails(noteDetails)
  }, [noteDetails])

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
              <StringMetadataInput id={ 'title' } content={ yamlMetadata.title }
                                   onContentChange={ title => setNoteFrontmatter({ ...yamlMetadata, title }) }/>
            </InputLabel>
            <InputLabel id={ 'type' } label={ t('editor.modal.metadataEditor.labels.type') }>
              <DatalistMetadataInput id={ 'type' } options={ Object.values(NoteType) } content={ yamlMetadata.type }
                                     onContentChange={ type => setNoteFrontmatter({ ...yamlMetadata, type: (type as NoteType) }) }/>
            </InputLabel>
            <InputLabel id={ 'dir' } label={ t('editor.modal.metadataEditor.labels.dir') }>
              <TextDirectionMetadataInput id={ 'dir' } content={ yamlMetadata.dir }
                                          onContentChange={ dir => setNoteFrontmatter({ ...yamlMetadata, dir }) }/>
            </InputLabel>
            <InputLabel id={ 'description' } label={ t('editor.modal.metadataEditor.labels.description') }>
              <StringMetadataTextarea id={ 'description' } content={ yamlMetadata.description }
                                      onContentChange={ description => setNoteFrontmatter({ ...yamlMetadata, description }) }/>
            </InputLabel>
            <InputLabel id={ 'disqus' } label={ t('editor.modal.metadataEditor.labels.disqus') }>
              <StringMetadataInput id={ 'disqus' } content={ yamlMetadata.disqus }
                                   onContentChange={ disqus => setNoteFrontmatter({ ...yamlMetadata, disqus }) }/>
            </InputLabel>
          </Col>
          <Col lg={ 6 }>
            <InputLabel id={ 'lang' } label={ t('editor.modal.metadataEditor.labels.lang') }>
              <DatalistMetadataInput id={ 'lang' } options={ ISO.getAllCodes() } content={ yamlMetadata.lang }
                                     onContentChange={ lang => setNoteFrontmatter({ ...yamlMetadata, lang }) }/>
            </InputLabel>
            <InputLabel id={ 'robots' } label={ t('editor.modal.metadataEditor.labels.robots') }>
              <StringMetadataInput id={ 'robots' } content={ yamlMetadata.robots }
                                   onContentChange={ robots => setNoteFrontmatter({ ...yamlMetadata, robots }) }/>
            </InputLabel>
            <InputLabel id={ 'breaks' } label={ t('editor.modal.metadataEditor.labels.breaks') }>
              <BreaksMetadataInput id={ 'breaks' } content={ yamlMetadata.breaks }
                                   onContentChange={ breaks => setNoteFrontmatter({ ...yamlMetadata, breaks }) }/>
            </InputLabel>
            <InputLabel id={ 'tags' } label={ t('editor.modal.metadataEditor.labels.tags') }>
              <TagsMetadataInput id={ 'tags' } content={ yamlMetadata.tags }
                                 onContentChange={ tags => setNoteFrontmatter({ ...yamlMetadata, tags }) }/>
            </InputLabel>
            <InputLabel id={ 'GA' } label={ t('editor.modal.metadataEditor.labels.GA') }>
              <StringMetadataInput id={ 'GA' } content={ yamlMetadata.GA }
                                   onContentChange={ GA => setNoteFrontmatter({ ...yamlMetadata, GA }) }/>
            </InputLabel>
          </Col>
        </Row>
      </Modal.Body>
    </CommonModal>
  )
}
