// @ts-nocheck
import clsx from 'clsx';
import React from 'react';

import { Link } from '$/components/link';

import * as api from '../../analytics-api';
import styles from '../../analytics.module.scss';
import numberFormatter from '../../number-formatter';
import { parseQuery } from '../../query';
import Modal from './modal';

class ModalTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      query: parseQuery(props.location.search, props.site),
    };
  }

  componentDidMount() {
    api
      .getStats(this.props.endpoint, this.props.site, this.state.query, { limit: 100 })
      .then((res) => this.setState({ loading: false, list: res }));
  }

  label() {
    return this.state.query.period === 'realtime' ? 'Current visitors' : 'Visitors';
  }

  renderTableItem(tableItem) {
    const query = new URLSearchParams(window.location.search);

    Object.entries(this.props.filter).forEach(([key, valueKey]) => {
      query.set(key, tableItem[valueKey]);
    });

    return (
      <tr className="text-sm dark:text-gray-200" key={tableItem.name}>
        <td className="p-2">
          <Link
            disabled
            className="hover:underline"
            href={`/${encodeURIComponent(this.props.site.domain)}` + '?' + query.toString()}
          >
            {this.props.renderIcon && this.props.renderIcon(tableItem)}
            {this.props.renderIcon && ' '}
            {tableItem.name}
          </Link>
        </td>
        <td className="w-32 p-2 font-medium" align="right">
          {numberFormatter(tableItem.visitors)}
          {tableItem.percentage >= 0 && (
            <span className="inline-block w-8 text-right text-xs">({tableItem.percentage}%)</span>
          )}
        </td>
      </tr>
    );
  }

  renderBody() {
    if (this.state.loading) {
      return (
        <div className={clsx('mx-auto mt-32', styles.loading)}>
          <div></div>
        </div>
      );
    }

    if (this.state.list) {
      return (
        <>
          <h1 className="text-xl font-bold dark:text-gray-100">{this.props.title}</h1>

          <div className="my-4 border-b border-gray-300 dark:border-gray-500"></div>
          <main className="modal__content">
            <table
              className={clsx(
                'w-max overflow-x-auto md:w-full',
                styles['table-striped'],
                styles['table-fixed'],
              )}
            >
              <thead>
                <tr>
                  <th
                    className="w-48 p-2 text-xs font-bold tracking-wide text-gray-500 dark:text-gray-400 lg:w-1/2"
                    align="left"
                  >
                    {this.props.keyLabel}
                  </th>
                  <th
                    // eslint-disable-next-line max-len
                    className="w-32 p-2 text-xs font-bold tracking-wide text-gray-500 dark:text-gray-400 lg:w-1/2"
                    align="right"
                  >
                    {this.label()}
                  </th>
                </tr>
              </thead>
              <tbody>{this.state.list.map(this.renderTableItem.bind(this))}</tbody>
            </table>
          </main>
        </>
      );
    }

    return null;
  }

  render() {
    return (
      <Modal site={this.props.site} show={!this.state.loading}>
        {this.renderBody()}
      </Modal>
    );
  }
}

export default ModalTable;
