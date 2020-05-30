import React, { Fragment, useState } from 'react'
import { Button, Modal, Col, Card, Row, Table } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Trans, useTranslation } from 'react-i18next'
import { TranslatedExternalLink } from '../../links/translated-external-link'

export const HelpButton: React.FC = () => {
  const { t } = useTranslation()
  const [show, setShow] = useState(true)

  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)
  return (
    <Fragment>
      <Button title={t('editor.menu.help')} className="ml-2 text-secondary" size="sm" variant="outline-light" onClick={handleShow}>
        <FontAwesomeIcon icon="question-circle"/>
      </Button>
      <Modal show={show} onHide={handleClose} animation={true} className="text-dark" size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>
            <FontAwesomeIcon icon="question-circle"/> <Trans i18nKey={'editor.menu.help'}/>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-dark">
          <Row>
            <Col lg={4}>
              <Card>
                <Card.Header><Trans i18nKey='editor.help.contacts.title'/></Card.Header>
                <Card.Body>
                  <Card.Text>
                    <ul className="list-unstyled">
                      <li>
                        <TranslatedExternalLink
                          i18nKey='editor.help.contacts.community'
                          href='https://community.codimd.org/'
                          icon='users'
                          className='text-primary'
                        />
                      </li>
                      <li>
                        <TranslatedExternalLink
                          i18nKey='editor.help.contacts.meetUsOn'
                          i18nOption={{ service: 'Matrix' }}
                          href='https://riot.im/app/#/room/#codimd:matrix.org'
                          icon='hashtag'
                          className='text-primary'
                        />
                      </li>
                      <li>
                        <TranslatedExternalLink
                          i18nKey='editor.help.contacts.reportIssue'
                          href='https://github.com/codimd/server/issues'
                          icon='tag'
                          className='text-primary'
                        />
                      </li>
                      <li>
                        <TranslatedExternalLink
                          i18nKey='editor.help.contacts.helpTranslating'
                          href='https://translate.codimd.org/'
                          icon='language'
                          className='text-primary'
                        />
                      </li>
                    </ul>
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card>
                <Card.Header><Trans i18nKey='editor.help.documents.title'/></Card.Header>
                <Card.Body>
                  <Card.Text>
                    <ul className="list-unstyled">
                      <li>
                        <TranslatedExternalLink
                          i18nKey='editor.help.documents.features'
                          href='/n/features'
                          icon='dot-circle'
                          className='text-primary'
                        />
                      </li>
                      <li>
                        <TranslatedExternalLink
                          i18nKey='editor.help.documents.yamlMetadata'
                          href='/n/yaml-data'
                          icon='dot-circle'
                          className='text-primary'
                        />
                      </li>
                      <li>
                        <TranslatedExternalLink
                          i18nKey='editor.help.documents.slideExample'
                          href='https://github.com/codimd/server/issues'
                          icon='dot-circle'
                          className='text-primary'
                        />
                      </li>
                    </ul>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={8}>
              <Card>
                <Card.Header><Trans i18nKey='editor.help.cheatsheet.title'/></Card.Header>
                <Card.Body>
                  <Card.Text>
                    <Table className="table-condensed table-cheatsheet">
                      <thead>
                        <tr>
                          <td><Trans i18nKey='editor.help.cheatsheet.example'/></td>
                          <td><Trans i18nKey='editor.help.cheatsheet.syntax'/></td>
                        </tr>
                      </thead>
                      <tbody className="markdown-body" style={{ fontFamily: 'inherit', fontSize: '14px', padding: 0, maxWidth: 'inherit' }}>
                        <tr>
                          <td><Trans i18nKey='editor.editorToolbar.header'/></td>
                          <td># <Trans i18nKey='editor.editorToolbar.header'/></td>
                        </tr>
                        <tr>
                          <td>
                            <ul>
                              <li><Trans i18nKey='editor.editorToolbar.unorderedList'/></li>
                            </ul>
                          </td>
                          <td>- <Trans i18nKey='editor.editorToolbar.unorderedList'/></td>
                        </tr>
                        <tr>
                          <td>
                            <ol>
                              <li><Trans i18nKey='editor.editorToolbar.orderedList'/></li>
                            </ol>
                          </td>
                          <td>1. <Trans i18nKey='editor.editorToolbar.orderedList'/></td>
                        </tr>
                        <tr>
                          <td>
                            <ul>
                              <li className="task-list-item">
                                <input type="checkbox" className="task-list-item-checkbox"
                                  disabled={false}/><label/><Trans i18nKey='editor.editorToolbar.checkList'/>
                              </li>
                            </ul>
                          </td>
                          <td>- [ ] <Trans i18nKey='editor.editorToolbar.checkList'/></td>
                        </tr>
                        <tr>
                          <td>
                            <blockquote> <Trans i18nKey='editor.editorToolbar.blockquote'/></blockquote>
                          </td>
                          <td>&gt; <Trans i18nKey='editor.editorToolbar.blockquote'/></td>
                        </tr>
                        <tr>
                          <td><strong><Trans i18nKey='editor.editorToolbar.bold'/></strong></td>
                          <td>**<Trans i18nKey='editor.editorToolbar.bold'/>**</td>
                        </tr>
                        <tr>
                          <td><i><Trans i18nKey='editor.editorToolbar.italic'/></i></td>
                          <td>*<Trans i18nKey='editor.editorToolbar.italic'/>*</td>
                        </tr>
                        <tr>
                          <td><s><Trans i18nKey='editor.editorToolbar.strikethrough'/></s></td>
                          <td>~~<Trans i18nKey='editor.editorToolbar.strikethrough'/>~~</td>
                        </tr>
                        <tr>
                          <td>19<sup>th</sup></td>
                          <td>19^th^</td>
                        </tr>
                        <tr>
                          <td>H<sub>2</sub>O</td>
                          <td>H~2~O</td>
                        </tr>
                        <tr>
                          <td>
                            <ins><Trans i18nKey='editor.help.cheatsheet.underlinedText'/></ins>
                          </td>
                          <td>++<Trans i18nKey='editor.help.cheatsheet.underlinedText'/>++</td>
                        </tr>
                        <tr>
                          <td>
                            <mark><Trans i18nKey='editor.help.cheatsheet.highlightedText'/></mark>
                          </td>
                          <td>==<Trans i18nKey='editor.help.cheatsheet.highlightedText'/>==</td>
                        </tr>
                        <tr>
                          <td><a><Trans i18nKey='editor.editorToolbar.link'/></a></td>
                          <td>[link text](https:// "title")</td>
                        </tr>
                        <tr>
                          <td><Trans i18nKey='editor.editorToolbar.image'/></td>
                          <td>![image alt](https:// "title")</td>
                        </tr>
                        <tr>
                          <td><code><Trans i18nKey='editor.editorToolbar.code'/></code></td>
                          <td>`<Trans i18nKey='editor.editorToolbar.code'/>`</td>
                        </tr>
                        <tr>
                          <td><pre style={{ border: 'none !important' }}><code className="javascript hljs"><div
                            className="wrapper"><div className="gutter linenumber"><span data-linenumber="1"/></div><div
                              className="code"><span className="hljs-keyword">var</span> x = <span
                                className="hljs-number">5</span>;
                            </div></div></code></pre>
                          </td>
                          <td>```javascript<br/>var x = 5;<br/>```</td>
                        </tr>
                        <tr>
                          <td><img alt=":smile:" className="emoji" src="./build/emojify.js/dist/images/basic/smile.png"
                            title=":smile:"/></td>
                          <td>:smile:</td>
                        </tr>
                        <tr>
                          <td>Extern</td>
                          <td>{'{'}%youtube youtube_id %{'}'}</td>
                        </tr>
                        <tr>
                          <td>L<sup>a</sup>T<sub>e</sub>X</td>
                          <td>$L^aT_eX$</td>
                        </tr>
                        <tr>
                          <td>
                            <div className="alert alert-info"><p><Trans i18nKey='editor.help.cheatsheet.exampleAlert'/></p></div>
                          </td>
                          <td>:::info<br/><Trans i18nKey='editor.help.cheatsheet.exampleAlert'/><br/>:::</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </Fragment>
  )
}
