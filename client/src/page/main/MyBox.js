import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import { getList, openInfoModal } from "../../api/documentApi";
import Page from "./Page";

function MyBox() {
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [document, setDocument] = useState("");
  const [page, setPage] = useState(1);
  const [list, setList] = useState("");

  useEffect(() => {
    getList(setList, page);
  }, [page, infoModalOpen]);
  return (
    <React.Fragment>
      <div>
        <table>
          <thead>
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th>No</th>
              <th>제목</th>
              <th>작성자</th>
              <th>등록일</th>
            </tr>
          </thead>
          <tbody>
            {list.dtoList &&
              list.dtoList.map((docs) => {
                return (
                  <tr key={docs.documentNo.documentNo}>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>{docs.documentNo.documentNo}</td>

                    <td
                      onClick={() =>
                        openInfoModal(
                          setInfoModalOpen,
                          docs.documentNo.documentNo,
                          setDocument
                        )
                      }
                    >
                      {docs.documentNo.originalName}
                    </td>
                    <td>{docs.userNo && docs && docs.userNo.name}</td>
                    <td>
                      {docs.documentNo.registerDate &&
                        docs &&
                        docs.documentNo.registerDate}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <Page list={list} page={page} setPage={setPage} />

      <Modal
        open={infoModalOpen}
        document={document}
        infoModalOpen={setInfoModalOpen}
      />
    </React.Fragment>
  );
}

export default MyBox;
